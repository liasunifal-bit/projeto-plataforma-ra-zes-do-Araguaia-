import type { AppCategorySlug } from '@/features/categories'

export type ProductSummary = {
  id: string
  name: string
  category: AppCategorySlug
  price: number
  imageUrl?: string
  imageAlt?: string
  description?: string
  stockStatus?: 'available' | 'limited' | 'unavailable'
  hasAudio?: boolean
  audioDuration?: string
  sellerName: string
  location: string
  unit?: string
  whatsappNumber?: string
}
