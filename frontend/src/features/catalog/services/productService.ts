import type { ProductSummary } from '../types'
import { supabase, requireSupabase } from '@/lib/supabase/client'
import type { AppCategorySlug } from '@/features/categories'

// Campos buscados em toda consulta de produto (listagem e detalhe).
// Centralizado aqui para não duplicar a mesma string em dois lugares.
const PRODUCT_SELECT = `
  id, name, description, price, unit, stock_status, image_alt, location_name,
  categories!inner(slug),
  seller_profiles!inner(display_name, whatsapp_number, location_name),
  product_media(media_type, storage_path, duration_seconds, display_order)
`

export async function listProducts(): Promise<ProductSummary[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) throw error
  return Promise.all((data ?? []).map(mapProduct))
}

export async function getProductById(productId: string): Promise<ProductSummary | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('id', productId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return mapProduct(data)
}

// O supabase-js sempre INFERE relações "!inner" como array no tipo,
// mesmo quando a foreign key é 1-para-1 (caso de categories e seller_profiles
// aqui). Em tempo de execução o banco retorna objeto direto, não array.
// Esse tipo reflete o que o TypeScript realmente vê vindo do .select();
// a função toSingle() abaixo normaliza para o formato usado no app.
type ProductRecord = {
  id: string
  name: string
  description: string | null
  price: number
  unit: string | null
  stock_status: ProductSummary['stockStatus']
  image_alt: string | null
  location_name: string | null
  categories: { slug: string }[] | { slug: string }
  seller_profiles:
    | { display_name: string; whatsapp_number: string; location_name: string }[]
    | { display_name: string; whatsapp_number: string; location_name: string }
  product_media: Array<{
    media_type: 'image' | 'audio'
    storage_path: string
    duration_seconds: number | null
    display_order: number
  }>
}

// Aceita tanto array quanto objeto único e devolve sempre o objeto único.
// Necessário porque o tipo gerado pelo supabase-js diz "array", mas o
// runtime entrega objeto direto em relações 1-para-1 com "!inner".
function toSingle<T>(value: T[] | T): T | undefined {
  return Array.isArray(value) ? value[0] : value
}

async function mapProduct(record: ProductRecord): Promise<ProductSummary> {
  const media = [...record.product_media].sort((a, b) => a.display_order - b.display_order)
  const image = media.find((item) => item.media_type === 'image')
  const audio = media.find((item) => item.media_type === 'audio')

  const category = toSingle(record.categories)
  const seller = toSingle(record.seller_profiles)

  if (!category || !seller) {
    throw new Error('Produto sem categoria ou vendedor associado.')
  }

  // storage_path pode ser:
  //  (a) um caminho interno do Storage do Supabase, ex: "products/foto.jpg"
  //  (b) uma URL externa completa, ex: "https://site.com/foto.jpg"
  // Detectamos qual caso é, e só chamamos createSignedUrl no caso (a).
  const imageUrl = image
    ? image.storage_path.startsWith('http')
      ? image.storage_path
      : (
          await requireSupabase().storage
            .from('product-images')
            .createSignedUrl(image.storage_path, 60 * 60)
        ).data?.signedUrl
    : undefined

  return {
    id: record.id,
    name: record.name,
    category: category.slug as AppCategorySlug,
    price: Number(record.price),
    imageUrl,
    imageAlt: record.image_alt ?? undefined,
    description: record.description ?? undefined,
    stockStatus: record.stock_status,
    hasAudio: Boolean(audio),
    audioDuration: audio?.duration_seconds ? formatDuration(audio.duration_seconds) : undefined,
    sellerName: seller.display_name,
    location: record.location_name ?? seller.location_name,
    unit: record.unit ?? undefined,
    whatsappNumber: seller.whatsapp_number,
  }
}

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export type CreateProductInput = {
  sellerId: string
  categorySlug: AppCategorySlug
  name: string
  description?: string
  price: number
  unit?: string
  locationName?: string
}

export async function createProduct(input: CreateProductInput) {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) throw new Error('Entre na sua conta para cadastrar um produto.')

  const { data: category, error: categoryError } = await client
    .from('categories')
    .select('id')
    .eq('slug', input.categorySlug)
    .single()
  if (categoryError) throw categoryError

  const { data, error } = await client
    .from('products')
    .insert({
      user_id: authData.user.id,
      seller_id: input.sellerId,
      category_id: category.id,
      name: input.name,
      description: input.description || null,
      price: input.price,
      unit: input.unit || null,
      location_name: input.locationName || null,
      status: 'draft',
    })
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function attachProductMedia(
  productId: string,
  media: {
    type: 'image' | 'audio'
    storagePath: string
    mimeType: string
    sizeBytes: number
    durationSeconds?: number
  },
) {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) throw new Error('Entre na sua conta para enviar arquivos.')

  const { error } = await client.from('product_media').insert({
    user_id: authData.user.id,
    product_id: productId,
    media_type: media.type,
    storage_path: media.storagePath,
    mime_type: media.mimeType,
    size_bytes: media.sizeBytes,
    duration_seconds: media.durationSeconds ?? null,
  })
  if (error) throw error
}
