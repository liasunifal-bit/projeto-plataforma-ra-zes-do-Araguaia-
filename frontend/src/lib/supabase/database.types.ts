export type AppRole = 'seller' | 'helper' | 'admin'
export type ContentStatus = 'draft' | 'published' | 'archived'
export type StockStatus = 'available' | 'limited' | 'unavailable'

export type ProfileRow = {
  id: string
  full_name: string
  phone: string | null
  avatar_path: string | null
  role: AppRole
}

export type SellerProfileRow = {
  id: string
  owner_id: string
  display_name: string
  whatsapp_number: string
  pix_key: string | null
  location_name: string
  latitude: number | null
  longitude: number | null
  is_published: boolean
}

export type ProductRow = {
  id: string
  owner_id: string
  seller_id: string
  name: string
  description: string | null
  price: number
  unit: string | null
  stock_status: StockStatus
  image_alt: string | null
  location_name: string | null
  latitude: number | null
  longitude: number | null
  status: ContentStatus
}
