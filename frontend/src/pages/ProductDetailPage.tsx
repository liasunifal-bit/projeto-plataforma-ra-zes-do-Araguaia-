import { useParams } from 'react-router-dom'

import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { Header } from '@/app/layout/Headers'
import { ProductDetail, useProductDetail } from '@/features/catalog'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { product, isLoading, errorMessage } = useProductDetail(productId)

  return (
    <AppShell>
      <Header title="Produto" />

      <main className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-6 pt-6">
        {isLoading && (
          <p className="rounded-2xl bg-white p-5 text-center text-sm font-bold text-foreground/60">
            Carregando produto...
          </p>
        )}

        {!isLoading && errorMessage && (
          <p className="rounded-2xl border border-destructive/20 bg-destructive/10 p-5 text-center text-sm font-bold text-destructive">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && !product && (
          <section
            aria-live="polite"
            className="rounded-2xl border border-dashed border-border/40 bg-white p-6 text-center"
          >
            <h1 className="text-base font-bold text-foreground">Produto nao encontrado</h1>
            <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/60">
              O item solicitado nao esta disponivel no catalogo atual.
            </p>
          </section>
        )}

        {!isLoading && !errorMessage && product && <ProductDetail product={product} />}
      </main>

      <BottomNav />
    </AppShell>
  )
}
