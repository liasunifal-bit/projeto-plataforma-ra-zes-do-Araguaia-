import type { AppCategorySlug } from '@/features/categories'

export type ProductMapPoint = {
  id: string
  category: AppCategorySlug
  latitude: number
  longitude: number
  label: string
}
