import { useState } from 'react';
import { PageHeader } from '@/app/layout/PageHeader';
import { BottomNav } from '@/app/layout/BottomNav';
import { LocalMap } from '../features/map/components/LocalMap';
import { MapCategoryFilters } from '../features/map/components/MapCategoryFilters';

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState('todos');

  return (
    <div className="min-h-screen w-full bg-muted/40 flex justify-center overflow-hidden">
      {/* Container "Celular Virtual" PWA restrito e centralizado */}
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-[100dvh] bg-background text-foreground flex flex-col relative shadow-2xl md:border-x md:border-border/20 overflow-hidden">
        {/* ─────────────── CABEÇALHO ─────────────── */}
        <PageHeader title="Mapa" />

        {/* ─────────────── CONTEÚDO PRINCIPAL ─────────────── */}
        <main className="flex flex-col gap-0 flex-1 relative overflow-hidden pb-20">
          {/* Filtros sobre o mapa */}
          <MapCategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Mapa */}
          <LocalMap
            activeCategory={activeCategory}
          />
        </main>

        {/* ─────────────── NAVEGAÇÃO INFERIOR ─────────────── */}
        <BottomNav />
      </div>
    </div>
  );
}
