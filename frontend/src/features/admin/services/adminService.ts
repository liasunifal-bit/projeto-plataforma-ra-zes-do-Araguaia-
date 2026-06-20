import { supabase } from '@/lib/supabase/client'

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
  email: string // Mocked for notification purposes
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
  sellerEmail: string // Mocked for notification purposes
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
  creatorEmail: string // Mocked for notification purposes
}

// ────────────── MOCK DATA ──────────────
let mockSellers: AdminSeller[] = [
  {
    id: 's1',
    userId: 'u1',
    displayName: 'Dona Maria do Queijo',
    description: 'Produtora artesanal de queijo minas, requeijão e manteiga de garrafa no assentamento comunitário.',
    whatsappNumber: '94991234567',
    pixKey: '12345678909',
    pixKeyType: 'cpf',
    locationName: 'Brejo Grande do Araguaia — Zona Rural',
    latitude: -5.6987,
    longitude: -48.4563,
    isPublished: false,
    createdAt: new Date().toISOString(),
    email: 'maria.queijo@gmail.com'
  },
  {
    id: 's2',
    userId: 'u2',
    displayName: 'Mel do Sertão (Seu Sebastião)',
    description: 'Apicultor com mais de 20 anos de tradição. Mel 100% puro e favos de mel silvestre colhidos localmente.',
    whatsappNumber: '94998765432',
    pixKey: 'sebastiao.mel@gmail.com',
    pixKeyType: 'email',
    locationName: 'Assentamento Santa Maria',
    latitude: -5.7124,
    longitude: -48.4321,
    isPublished: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    email: 'sebastiao.mel@gmail.com'
  }
]

let mockProducts: AdminProduct[] = [
  {
    id: 'p1',
    userId: 'u2',
    sellerId: 's2',
    categoryId: 'cat1',
    categorySlug: 'comida',
    name: 'Mel Silvestre Orgânico 500ml',
    description: 'Mel silvestre colhido diretamente das colmeias do assentamento Santa Maria. Sem adição de açúcar ou conservantes.',
    price: 35.00,
    unit: 'Garrafa',
    stockStatus: 'available',
    status: 'draft',
    createdAt: new Date().toISOString(),
    sellerName: 'Mel do Sertão (Seu Sebastião)',
    sellerEmail: 'sebastiao.mel@gmail.com'
  },
  {
    id: 'p2',
    userId: 'u1',
    sellerId: 's1',
    categoryId: 'cat2',
    categorySlug: 'comida',
    name: 'Queijo Minas Frescal Meia Cura',
    description: 'Queijo artesanal feito com leite fresco da manhã. Peso aproximado de 800g.',
    price: 28.00,
    unit: 'Peça',
    stockStatus: 'available',
    status: 'published',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    sellerName: 'Dona Maria do Queijo',
    sellerEmail: 'maria.queijo@gmail.com'
  },
  {
    id: 'p3',
    userId: 'u3',
    sellerId: 's3',
    categoryId: 'cat3',
    categorySlug: 'artesanato',
    name: 'Cesta de Fibra de Buriti',
    description: 'Cesta tecida à mão por artesãs locais usando a fibra natural do buriti.',
    price: 45.00,
    unit: 'Unidade',
    stockStatus: 'limited',
    status: 'draft',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    sellerName: 'Artesanatos Araguaia',
    sellerEmail: 'artesanato.araguaia@hotmail.com'
  }
]

let mockEvents: AdminEvent[] = [
  {
    id: 'e1',
    userId: 'u4',
    title: 'Feira da Agricultura Familiar de Brejo Grande',
    description: 'Feira comunitária semanal com exposição e venda direta de frutas, legumes, artesanato e pratos típicos.',
    startsAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    endsAt: new Date(Date.now() + 86400000 * 2 + 3600000 * 8).toISOString(),
    locationName: 'Praça Central de Brejo Grande',
    latitude: -5.6978,
    longitude: -48.4439,
    status: 'draft',
    createdAt: new Date().toISOString(),
    creatorName: 'Associação de Moradores',
    creatorEmail: 'associacao.brejograndedois@gmail.com'
  },
  {
    id: 'e2',
    userId: 'u5',
    title: 'Encontro Comunidade e Ambiente',
    description: 'Palestra e roda de conversa sobre agroecologia e preservação ambiental na região do rio Araguaia.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() - 86400000 + 3600000 * 3).toISOString(),
    locationName: 'Escola Família Agrícola',
    latitude: -5.7311,
    longitude: -48.4112,
    status: 'published',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    creatorName: 'Coletivo Agroecológico',
    creatorEmail: 'coletivo.agro@araguaia.org'
  }
]

// ────────────── SERVICES ──────────────

export async function getAdminMetrics() {
  if (!supabase) {
    const sellersPending = mockSellers.filter(s => !s.isPublished).length
    const productsPending = mockProducts.filter(p => p.status === 'draft').length
    const eventsPending = mockEvents.filter(e => e.status === 'draft').length

    return {
      sellersTotal: mockSellers.length,
      sellersPending,
      productsPending,
      eventsPending,
      approvedTotal: mockProducts.filter(p => p.status === 'published').length + mockSellers.filter(s => s.isPublished).length + mockEvents.filter(e => e.status === 'published').length,
      rejectedTotal: mockProducts.filter(p => p.status === 'archived').length + mockEvents.filter(e => e.status === 'archived').length,
    }
  }

  try {
    const [
      { count: sellersTotal },
      { count: sellersPending },
      { count: productsPending },
      { count: eventsPending },
      { count: productsPublished },
      { count: eventsPublished },
      { count: sellersPublished }
    ] = await Promise.all([
      supabase.from('seller_profiles').select('*', { count: 'exact', head: true }),
      supabase.from('seller_profiles').select('*', { count: 'exact', head: true }).eq('is_published', false),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('seller_profiles').select('*', { count: 'exact', head: true }).eq('is_published', true),
    ])

    const approvedTotal = (productsPublished ?? 0) + (eventsPublished ?? 0) + (sellersPublished ?? 0)
    
    // Contagem de rejeitados (arquivados na modelagem de status do banco)
    const [{ count: productsArchived }, { count: eventsArchived }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'archived'),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'archived')
    ])

    return {
      sellersTotal: sellersTotal ?? 0,
      sellersPending: sellersPending ?? 0,
      productsPending: productsPending ?? 0,
      eventsPending: eventsPending ?? 0,
      approvedTotal,
      rejectedTotal: (productsArchived ?? 0) + (eventsArchived ?? 0)
    }
  } catch (error) {
    console.error('Erro ao buscar métricas administrativas:', error)
    return {
      sellersTotal: 0,
      sellersPending: 0,
      productsPending: 0,
      eventsPending: 0,
      approvedTotal: 0,
      rejectedTotal: 0
    }
  }
}

export async function listAdminSellers(): Promise<AdminSeller[]> {
  if (!supabase) return mockSellers

  const { data, error } = await supabase
    .from('seller_profiles')
    .select(`
      id, user_id, display_name, description, whatsapp_number, pix_key, pix_key_type,
      location_name, latitude, longitude, is_published, created_at
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
    email: `${item.display_name.toLowerCase().replace(/\s+/g, '')}@gmail.com` // simulated email
  }))
}

export async function listAdminProducts(): Promise<AdminProduct[]> {
  if (!supabase) return mockProducts

  const { data, error } = await supabase
    .from('products')
    .select(`
      id, user_id, seller_id, category_id, name, description, price, unit, stock_status, status, created_at,
      categories(slug),
      seller_profiles(display_name)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map(item => {
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
      sellerEmail: `${(sell?.display_name ?? 'vendedor').toLowerCase().replace(/\s+/g, '')}@gmail.com` // simulated
    }
  })
}

export async function listAdminEvents(): Promise<AdminEvent[]> {
  if (!supabase) return mockEvents

  const { data, error } = await supabase
    .from('events')
    .select(`
      id, user_id, title, description, starts_at, ends_at, location_name, latitude, longitude, status, created_at,
      profiles(full_name)
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
      creatorEmail: `${(prof?.full_name ?? 'organizador').toLowerCase().replace(/\s+/g, '')}@gmail.com` // simulated
    }
  })
}

export async function updateSellerStatus(sellerId: string, isPublished: boolean) {
  if (!supabase) {
    mockSellers = mockSellers.map(s => s.id === sellerId ? { ...s, isPublished } : s)
    return
  }

  const { error } = await supabase
    .from('seller_profiles')
    .update({ is_published: isPublished })
    .eq('id', sellerId)

  if (error) throw error
}

export async function updateProductStatus(productId: string, status: 'draft' | 'published' | 'archived') {
  if (!supabase) {
    mockProducts = mockProducts.map(p => p.id === productId ? { ...p, status } : p)
    return
  }

  const { error } = await supabase
    .from('products')
    .update({ status })
    .eq('id', productId)

  if (error) throw error
}

export async function updateEventStatus(eventId: string, status: 'draft' | 'published' | 'archived') {
  if (!supabase) {
    mockEvents = mockEvents.map(e => e.id === eventId ? { ...e, status } : e)
    return
  }

  const { error } = await supabase
    .from('events')
    .update({ status })
    .eq('id', eventId)

  if (error) throw error
}
