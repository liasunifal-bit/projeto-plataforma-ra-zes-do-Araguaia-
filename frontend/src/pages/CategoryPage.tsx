import { useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { PageHeader } from '@/app/layout/PageHeader'
import { appCategoryBySlug } from '@/features/categories'
import {
  ProductGrid,
  ProductSearch,
  useCatalogProducts,
  useProductSearch,
} from '@/features/catalog'

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const category = appCategoryBySlug[categorySlug as keyof typeof appCategoryBySlug]
  const { products, isLoading, errorMessage } = useCatalogProducts()
  const [query, setQuery] = useState('')

  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === categorySlug),
    [products, categorySlug],
  )

  const filteredProducts = useProductSearch(categoryProducts, query)

  return (
    <AppShell>
      <PageHeader title={category?.label ?? 'Categoria'} />

      <main className="flex flex-1 flex-col gap-6 md:gap-8 overflow-y-auto px-4 md:px-6 pb-6 md:pb-8 pt-6 md:pt-8">
        <header className="flex flex-col gap-2 md:max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Marketplace Comunitario
          </p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold leading-tight text-foreground">
            {category?.label}
          </h1>
          <p className="text-sm font-medium leading-relaxed text-foreground/60">
            {category?.description}
          </p>
        </header>

        <section aria-label="Busca de produtos" className="flex flex-col gap-4">
          <ProductSearch value={query} onChange={setQuery} />
        </section>

        <section aria-labelledby="category-results-title" className="flex flex-col gap-4">
          <header className="flex items-center justify-between gap-3">
            <h2 id="category-results-title" className="font-heading text-lg font-bold text-foreground">
              Produtos
            </h2>
            <p className="text-xs font-bold uppercase tracking-wide text-foreground/45">
              {filteredProducts.length} itens
            </p>
          </header>

          {isLoading && (
            <p className="rounded-2xl bg-white p-5 text-center text-sm font-bold text-foreground/60">
              Carregando produtos...
            </p>
          )}

          {!isLoading && errorMessage && (
            <p className="rounded-2xl border border-destructive/20 bg-destructive/10 p-5 text-center text-sm font-bold text-destructive">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && (
            <ProductGrid
              products={filteredProducts}
              emptyMessage="Nenhum produto encontrado nessa categoria."
            />
          )}
        </section>
      </main>

      <BottomNav />
    </AppShell>
  )
}
