import { useEffect, useState } from 'react'

import type { AppCategorySlug } from '@/features/categories'
import { supabase } from '@/lib/supabase/client'
import type { ProductMapPoint } from '../types'

export function useMapProducts(): ProductMapPoint[] {
  const [points, setPoints] = useState<ProductMapPoint[]>([])

  useEffect(() => {
    if (!supabase) return
    const client = supabase

    client
      .from('products')
      .select('id, name, latitude, longitude, categories!inner(slug)')
      .or('status.eq.published,status.eq.draft,status.is.null')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .then(({ data }) => {
        setPoints(
          (data ?? []).map((product) => ({
            id: product.id,
            label: product.name,
            category: product.categories[0]?.slug as AppCategorySlug,
            latitude: Number(product.latitude),
            longitude: Number(product.longitude),
          })),
        )
      })
  }, [])

  return points
}
