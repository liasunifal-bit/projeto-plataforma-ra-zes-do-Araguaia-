import type { ProductSummary } from '../types'

export function useProductSearch(products: ProductSummary[], query: string): ProductSummary[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return products
  }

  return products.filter((product) => product.name.toLowerCase().includes(normalizedQuery))
}
