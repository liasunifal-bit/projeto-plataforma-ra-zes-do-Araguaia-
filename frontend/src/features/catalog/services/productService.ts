import type { ProductSummary } from '../types'
import { supabase, requireSupabase } from '@/lib/supabase/client'
import type { AppCategorySlug } from '@/features/categories'

const MOCK_PRODUCTS: ProductSummary[] = [
  {
    id: '1',
    name: 'Peixe Tambaqui Fresco',
    category: 'peixe',
    price: 45,
    imageUrl:
      'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Peixe fresco em bancada de feira',
    description:
      'Peixe tambaqui fresco vendido por produtor local, ideal para assar, cozinhar ou preparar em familia.',
    stockStatus: 'available',
    hasAudio: true,
    audioDuration: '0:15',
    sellerName: 'Seu Joao',
    location: 'Vila Nova',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
  {
    id: '2',
    name: 'Farinha de Mandioca',
    category: 'comida',
    price: 18,
    imageUrl:
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Farinha de mandioca artesanal',
    description:
      'Farinha de mandioca caseira, torrada em pequena escala e pronta para acompanhar as refeicoes do dia a dia.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Dona Maria',
    location: 'Comunidade Sao Joao',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
  {
    id: '3',
    name: 'Cesto de Palha Tecido',
    category: 'artesanato',
    price: 65,
    imageUrl:
      'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Cesto artesanal de palha tecido a mao',
    description:
      'Cesto de palha tecido manualmente, resistente para uso domestico, decoracao ou organizacao.',
    stockStatus: 'limited',
    hasAudio: true,
    audioDuration: '0:22',
    sellerName: 'Tia Raimunda',
    location: 'Centro',
    whatsappNumber: '5599999999999',
  },
  {
    id: '4',
    name: 'Conserto de Redes',
    category: 'servicos',
    price: 30,
    description:
      'Servico local para conserto de redes, combinando prazo e retirada diretamente com o vendedor.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Seu Antonio',
    location: 'Beira Rio',
    unit: 'servico',
    whatsappNumber: '5599999999999',
  },
  {
    id: '5',
    name: 'Geleia de Cupuacu',
    category: 'comida',
    price: 22,
    imageUrl:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Pote de geleia artesanal',
    description:
      'Geleia artesanal com fruta regional, boa para cafe da manha, sobremesas e cestas de presente.',
    stockStatus: 'limited',
    hasAudio: false,
    sellerName: 'Sabores da Vila',
    location: 'Centro',
    unit: 'pote',
    whatsappNumber: '5599999999999',
  },
  {
    id: '6',
    name: 'Biojoia de Sementes',
    category: 'artesanato',
    price: 38,
    imageUrl:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Colar artesanal com sementes',
    description:
      'Acessorio artesanal feito com sementes selecionadas, valorizando a identidade local.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Atelie Maos do Rio',
    location: 'Vila Nova',
    unit: 'un',
    whatsappNumber: '5599999999999',
  },
]

export async function listProducts(): Promise<ProductSummary[]> {
  if (!supabase) return MOCK_PRODUCTS

  const { data, error } = await supabase
    .from('products')
    .select(`
      id, name, description, price, unit, stock_status, image_alt, location_name,
      categories!inner(slug),
      seller_profiles!inner(display_name, whatsapp_number, location_name),
      product_media(media_type, storage_path, duration_seconds, display_order)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) throw error
  return Promise.all((data ?? []).map(mapProduct))
}

export async function getProductById(productId: string): Promise<ProductSummary | null> {
  if (!supabase) return MOCK_PRODUCTS.find((product) => product.id === productId) ?? null

  const { data, error } = await supabase
    .from('products')
    .select(`
      id, name, description, price, unit, stock_status, image_alt, location_name,
      categories!inner(slug),
      seller_profiles!inner(display_name, whatsapp_number, location_name),
      product_media(media_type, storage_path, duration_seconds, display_order)
    `)
    .eq('id', productId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return mapProduct(data)
}

type ProductRecord = {
  id: string
  name: string
  description: string | null
  price: number
  unit: string | null
  stock_status: ProductSummary['stockStatus']
  image_alt: string | null
  location_name: string | null
  categories: Array<{ slug: string }>
  seller_profiles: Array<{
    display_name: string
    whatsapp_number: string
    location_name: string
  }>
  product_media: Array<{
    media_type: 'image' | 'audio'
    storage_path: string
    duration_seconds: number | null
    display_order: number
  }>
}

async function mapProduct(record: ProductRecord): Promise<ProductSummary> {
  const media = [...record.product_media].sort((a, b) => a.display_order - b.display_order)
  const image = media.find((item) => item.media_type === 'image')
  const audio = media.find((item) => item.media_type === 'audio')
  const category = record.categories[0]
  const seller = record.seller_profiles[0]

  if (!category || !seller) {
    throw new Error('Produto sem categoria ou vendedor associado.')
  }

  const imageUrl = image
    ? (
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
  publish?: boolean
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
      owner_id: authData.user.id,
      seller_id: input.sellerId,
      category_id: category.id,
      name: input.name,
      description: input.description || null,
      price: input.price,
      unit: input.unit || null,
      location_name: input.locationName || null,
      status: input.publish ? 'published' : 'draft',
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
    owner_id: authData.user.id,
    product_id: productId,
    media_type: media.type,
    storage_path: media.storagePath,
    mime_type: media.mimeType,
    size_bytes: media.sizeBytes,
    duration_seconds: media.durationSeconds ?? null,
  })
  if (error) throw error
}
