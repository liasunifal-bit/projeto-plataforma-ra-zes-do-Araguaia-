import { requireSupabase, supabase } from '@/lib/supabase/client'

// ────────────── TIPOS ──────────────

export interface AdminSeller {
  id: string
  userId: string
  displayName: string
  description: string | null
  whatsappNumber: string
  pixKey: string | null
  pixKeyType: string | null
  locationName: string
  latitude: number | null
  longitude: number | null
  isPublished: boolean
  createdAt: string
  email: string
}

export interface AdminProduct {
  id: string
  userId: string
  sellerId: string
  categoryId: string
  categorySlug: string
  name: string
  description: string | null
  price: number
  unit: string | null
  stockStatus: 'available' | 'limited' | 'unavailable'
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  sellerName: string
  sellerEmail: string
}

export interface AdminEvent {
  id: string
  userId: string
  title: string
  description: string | null
  startsAt: string
  endsAt: string | null
  locationName: string
  latitude: number | null
  longitude: number | null
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  creatorName: string
  creatorEmail: string
}

// ────────────── SERVICES ──────────────

export async function getAdminMetrics() {
  if (!supabase) return {
    sellersTotal: 0,
    sellersPending: 0,
    productsPending: 0,
    eventsPending: 0,
    approvedTotal: 0,
    rejectedTotal: 0,
  }

  try {
    const [
      { count: sellersTotal },
      { count: sellersPending },
      { count: productsPending },
      { count: eventsPending },
      { count: productsPublished },
      { count: eventsPublished },
      { count: sellersPublished },
      { count: productsArchived },
      { count: eventsArchived },
    ] = await Promise.all([
      supabase.from('seller_profiles').select('*', { count: 'exact', head: true }),
      supabase.from('seller_profiles').select('*', { count: 'exact', head: true }).eq('is_published', false),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('seller_profiles').select('*', { count: 'exact', head: true }).eq('is_published', true),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'archived'),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'archived'),
    ])

    return {
      sellersTotal: sellersTotal ?? 0,
      sellersPending: sellersPending ?? 0,
      productsPending: productsPending ?? 0,
      eventsPending: eventsPending ?? 0,
      approvedTotal: (productsPublished ?? 0) + (eventsPublished ?? 0) + (sellersPublished ?? 0),
      rejectedTotal: (productsArchived ?? 0) + (eventsArchived ?? 0),
    }
  } catch (error) {
    console.error('Erro ao buscar métricas administrativas:', error)
    return {
      sellersTotal: 0,
      sellersPending: 0,
      productsPending: 0,
      eventsPending: 0,
      approvedTotal: 0,
      rejectedTotal: 0,
    }
  }
}

export async function listAdminSellers(): Promise<AdminSeller[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('seller_profiles')
    .select(`
      id, user_id, display_name, description, whatsapp_number, pix_key, pix_key_type,
      location_name, latitude, longitude, is_published, created_at, email
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map(item => ({
    id: item.id,
    userId: item.user_id,
    displayName: item.display_name,
    description: item.description,
    whatsappNumber: item.whatsapp_number,
    pixKey: item.pix_key,
    pixKeyType: item.pix_key_type,
    locationName: item.location_name,
    latitude: item.latitude ? Number(item.latitude) : null,
    longitude: item.longitude ? Number(item.longitude) : null,
    isPublished: item.is_published,
    createdAt: item.created_at,
    email: item.email ?? '',
  }))
}

export async function listAdminProducts(): Promise<AdminProduct[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('products')
    .select(`
      id, user_id, seller_id, category_id, name, description, price, unit,
      stock_status, status, created_at,
      categories(slug),
      seller_profiles(display_name, email)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map(item => {
    // O supabase-js pode retornar joins como objeto ou array dependendo da versão.
    // toSingle() normaliza os dois casos.
    const cat = Array.isArray(item.categories) ? item.categories[0] : item.categories
    const sell = Array.isArray(item.seller_profiles) ? item.seller_profiles[0] : item.seller_profiles

    return {
      id: item.id,
      userId: item.user_id,
      sellerId: item.seller_id,
      categoryId: item.category_id,
      categorySlug: cat?.slug ?? 'outros',
      name: item.name,
      description: item.description,
      price: Number(item.price),
      unit: item.unit,
      stockStatus: item.stock_status,
      status: item.status,
      createdAt: item.created_at,
      sellerName: sell?.display_name ?? 'Desconhecido',
      sellerEmail: sell?.email ?? '',
    }
  })
}

export async function listAdminEvents(): Promise<AdminEvent[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('events')
    .select(`
      id, user_id, title, description, starts_at, ends_at,
      location_name, latitude, longitude, status, created_at,
      profiles(full_name, email)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map(item => {
    const prof = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles

    return {
      id: item.id,
      userId: item.user_id,
      title: item.title,
      description: item.description,
      startsAt: item.starts_at,
      endsAt: item.ends_at,
      locationName: item.location_name,
      latitude: item.latitude ? Number(item.latitude) : null,
      longitude: item.longitude ? Number(item.longitude) : null,
      status: item.status,
      createdAt: item.created_at,
      creatorName: prof?.full_name ?? 'Organizador',
      creatorEmail: prof?.email ?? '',
    }
  })
}

export async function updateSellerStatus(sellerId: string, isPublished: boolean) {
  const { error } = await requireSupabase()
    .from('seller_profiles')
    .update({ is_published: isPublished })
    .eq('id', sellerId)

  if (error) throw error
}

export async function updateProductStatus(
  productId: string,
  status: 'draft' | 'published' | 'archived',
) {
  const { error } = await requireSupabase()
    .from('products')
    .update({ status })
    .eq('id', productId)

  if (error) throw error
}

export async function updateEventStatus(
  eventId: string,
  status: 'draft' | 'published' | 'archived',
) {
  const { error } = await requireSupabase()
    .from('events')
    .update({ status })
    .eq('id', eventId)

  if (error) throw error
}