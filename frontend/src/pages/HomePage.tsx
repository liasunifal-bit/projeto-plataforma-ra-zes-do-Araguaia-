import { Link } from 'react-router-dom'
import { PlusCircle, ChevronRight } from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { Header } from '@/app/layout/Headers'
import { BottomNav } from '@/app/layout/BottomNav'
import { CategoryGrid, ProductGrid } from '@/features/catalog'
import { useProducts } from '@/features/catalog/hooks/useProducts'

export default function HomePage() {
  const products = useProducts()

  return (
    <AppShell>
      {/* ─────────────── CABEÇALHO ─────────────── */}
      <Header />

      {/* ─────────────── CONTEÚDO PRINCIPAL ─────────────── */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-7 overflow-y-auto px-4 pb-8 pt-6 md:px-8 lg:px-10 lg:pb-10">

        {/* Bloco de Categorias */}
        <section>
          <h2 className="font-heading font-bold text-lg text-foreground tracking-wide mb-4">
            O que você procura?
          </h2>
          <CategoryGrid />
        </section>

        {/* Bloco de Destaques */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg text-foreground tracking-wide">
              Destaques
            </h2>
            <Link
              to="/catalogo"
              className="flex items-center gap-1 text-accent font-bold text-xs uppercase tracking-wider hover:text-accent/80 transition-colors group"
            >
              Ver todos
              <ChevronRight size={14} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <ProductGrid products={products} />
        </section>

        {/* Banner CTA — Quero Vender */}
        <Link
          to="/cadastrar-produto"
          className="flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 px-6 py-5 font-heading text-base font-bold tracking-wide text-primary transition-all duration-200 hover:scale-[1.01] hover:border-primary/80 hover:bg-primary/10 active:scale-[0.99] md:self-start md:px-8 group"
        >
          <PlusCircle
            size={22}
            strokeWidth={2.5}
            className="text-primary group-hover:scale-110 transition-transform duration-200"
          />
          <span>Quero vender meus produtos</span>
        </Link>

      </main>

      {/* ─────────────── NAVEGAÇÃO INFERIOR ─────────────── */}
      <BottomNav />
    </AppShell>
  )
}
