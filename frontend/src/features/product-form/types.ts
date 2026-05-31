import type { AppCategorySlug } from '@/features/categories'

export type ProductFormMode = 'self' | 'helper'

export type ProductFormValues = {
  mode: ProductFormMode
  name: string
  category?: AppCategorySlug
  price?: number
  description?: string
}
