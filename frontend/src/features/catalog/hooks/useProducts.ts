import { useEffect, useState } from 'react'

import { listProducts } from '../services/productService'
import type { ProductSummary } from '../types'
import { supabase } from '@/lib/supabase/client'

export function useProducts(): ProductSummary[] {
  const [products, setProducts] = useState<ProductSummary[]>([])

  useEffect(() => {
    const load = () => void listProducts().then(setProducts)
    load()

    const channel = supabase
      ?.channel('home-products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, load)
      .subscribe()

    return () => {
      if (channel && supabase) void supabase.removeChannel(channel)
    }
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

    const load = () =>
      listProducts().then((products) => {
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

    void load()
    const channel = supabase
      ?.channel('catalog-products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => void load())
      .subscribe()

    return () => {
      isActive = false
      if (channel && supabase) void supabase.removeChannel(channel)
    }
  }, [])

  return state
}
