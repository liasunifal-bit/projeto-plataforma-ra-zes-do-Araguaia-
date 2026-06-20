import { ProductCard } from './ProductCard'
import type { ProductSummary } from '../types'

type ProductGridProps = {
  products: ProductSummary[]
  emptyMessage?: string
}

export function ProductGrid({
  products,
  emptyMessage = 'Nenhum produto encontrado.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section
        aria-live="polite"
        className="col-span-full flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/40 bg-white px-5 py-10 text-foreground/45"
      >
        <p className="text-sm font-bold text-foreground">Sem produtos por aqui</p>
        <p className="max-w-64 text-center text-xs font-medium leading-relaxed">{emptyMessage}</p>
      </section>
    )
  }

  return (
    <section
      aria-label="Lista de produtos"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-5"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
