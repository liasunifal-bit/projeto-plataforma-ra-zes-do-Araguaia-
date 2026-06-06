import { useEffect, useState } from 'react'

import { getProductById } from '../services/productService'
import type { ProductSummary } from '../types'

type ProductDetailState = {
  product: ProductSummary | null
  isLoading: boolean
  errorMessage: string | null
}

export function useProductDetail(productId: string | undefined): ProductDetailState {
  const [state, setState] = useState<ProductDetailState>({
    product: null,
    isLoading: true,
    errorMessage: null,
  })

  useEffect(() => {
    let isActive = true

    if (!productId) {
      setState({
        product: null,
        isLoading: false,
        errorMessage: 'Produto nao informado.',
      })
      return
    }

    getProductById(productId)
      .then((product) => {
        if (isActive) {
          setState({ product, isLoading: false, errorMessage: null })
        }
      })
      .catch(() => {
        if (isActive) {
          setState({
            product: null,
            isLoading: false,
            errorMessage: 'Nao conseguimos abrir este produto agora.',
          })
        }
      })

    return () => {
      isActive = false
    }
  }, [productId])

  return state
}
