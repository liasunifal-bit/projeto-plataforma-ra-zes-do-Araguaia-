import { useEffect, useState } from 'react'

import { listProducts } from '../services/productService'
import type { ProductSummary } from '../types'

export function useProducts(): ProductSummary[] {
  const [products, setProducts] = useState<ProductSummary[]>([])

  useEffect(() => {
    listProducts().then(setProducts)
  }, [])

  return products
}

type CatalogProductsState = {
  products: ProductSummary[]
  isLoading: boolean
  errorMessage: string | null
}

export function useCatalogProducts(): CatalogProductsState {
  const [state, setState] = useState<CatalogProductsState>({
    products: [],
    isLoading: true,
    errorMessage: null,
  })

  useEffect(() => {
    let isActive = true

    listProducts()
      .then((products) => {
        if (isActive) {
          setState({ products, isLoading: false, errorMessage: null })
        }
      })
      .catch(() => {
        if (isActive) {
          setState({
            products: [],
            isLoading: false,
            errorMessage: 'Nao conseguimos carregar os produtos agora. Tente novamente em instantes.',
          })
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return state
}
