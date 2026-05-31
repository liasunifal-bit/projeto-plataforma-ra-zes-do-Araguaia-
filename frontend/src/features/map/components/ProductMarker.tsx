import type { ProductMapPoint } from '../types'

type ProductMarkerProps = {
  point: ProductMapPoint
}

export function ProductMarker({ point }: ProductMarkerProps) {
  return <span>{point.label}</span>
}
