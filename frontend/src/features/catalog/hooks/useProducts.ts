import { useEffect, useState } from 'react'
import type { ProductSummary } from '../types'
import { listProducts } from '../services/productService'

export function useProducts(): ProductSummary[] {
  const [products, setProducts] = useState<ProductSummary[]>([])

  useEffect(() => {
    listProducts().then(setProducts)
  }, [])

  return products
}
