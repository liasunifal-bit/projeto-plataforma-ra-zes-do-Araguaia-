import type { AppCategorySlug } from '@/features/categories'

export type ProductMapPoint = {
  id: string
  label: string
  category: AppCategorySlug
  latitude: number
  longitude: number
}
