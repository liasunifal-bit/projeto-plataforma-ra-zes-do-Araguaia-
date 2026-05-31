import type { AppCategorySlug } from '@/features/categories'

import type { ProductSummary } from '../types'

export function useCategoryProducts(
  products: ProductSummary[],
  categorySlug: AppCategorySlug,
): ProductSummary[] {
  return products.filter((product) => product.category === categorySlug)
}
