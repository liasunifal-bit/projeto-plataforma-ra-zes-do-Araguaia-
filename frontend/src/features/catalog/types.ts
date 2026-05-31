import type { AppCategorySlug } from '@/features/categories'

export type ProductSummary = {
  id: string
  name: string
  category: AppCategorySlug
  price: number
  imageUrl?: string
  hasAudio?: boolean
  audioDuration?: string
  sellerName: string
  location: string
  unit?: string
  whatsappNumber?: string
}
