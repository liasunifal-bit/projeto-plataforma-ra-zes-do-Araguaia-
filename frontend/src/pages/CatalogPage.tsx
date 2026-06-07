import { useMemo, useState } from 'react'

import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { Header } from '@/app/layout/Headers'
import type { AppCategorySlug } from '@/features/categories'
import {
  CategoryFilter,
  ProductGrid,
  ProductSearch,
  useCatalogProducts,
  useProductSearch,
} from '@/features/catalog'

export default function CatalogPage() {
  const { products, isLoading, errorMessage } = useCatalogProducts()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<AppCategorySlug | ''>('')

  const productsByCategory = useMemo(
    () =>
      selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products,
    [products, selectedCategory],
  )
  const filteredProducts = useProductSearch(productsByCategory, query)

  return (
    <AppShell>
      <Header title="Catalogo" />

      <main className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-6 pt-6">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Marketplace Comunitario
          </p>
          <h1 className="font-heading text-2xl font-bold leading-tight text-foreground">
            Produtos locais do Raizes do Araguaia
          </h1>
          <p className="text-sm font-medium leading-relaxed text-foreground/60">
            Busque por nome, filtre por categoria e abra cada produto para ver detalhes do vendedor.
          </p>
        </header>

        <section aria-label="Busca e filtros do catalogo" className="flex flex-col gap-4">
          <ProductSearch value={query} onChange={setQuery} />
          <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
        </section>

        <section aria-labelledby="catalog-results-title" className="flex flex-col gap-4">
          <header className="flex items-center justify-between gap-3">
            <h2 id="catalog-results-title" className="font-heading text-lg font-bold text-foreground">
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
              emptyMessage="Tente mudar a busca ou escolher outra categoria."
            />
          )}
        </section>
      </main>

      <BottomNav />
    </AppShell>
  )
}
