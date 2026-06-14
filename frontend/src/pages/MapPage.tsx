import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { Header } from '@/app/layout/Headers'
import { useMapProducts } from '@/features/map'

export default function MapPage() {
  const points = useMapProducts()

  return (
    <AppShell>
      <Header title="Mapa" />
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <h1 className="font-heading text-2xl font-bold">Produtos no mapa</h1>
        <p className="text-sm text-foreground/60">
          {points.length} produto(s) publicado(s) com localizacao.
        </p>
        {points.map((point) => (
          <article key={point.id} className="rounded-2xl border bg-white p-4">
            <h2 className="font-bold">{point.label}</h2>
            <p className="text-sm">
              {point.latitude}, {point.longitude}
            </p>
          </article>
        ))}
      </main>
      <BottomNav />
    </AppShell>
  )
}
