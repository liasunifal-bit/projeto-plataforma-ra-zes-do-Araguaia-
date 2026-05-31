import { ProductCard } from './ProductCard'
import type { ProductSummary } from '../types'

type ProductGridProps = {
  products: ProductSummary[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-2 py-10 flex flex-col items-center justify-center text-foreground/35 gap-2">
        <span className="text-4xl select-none">🌿</span>
        <p className="text-sm font-medium">Nenhum produto encontrado.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
