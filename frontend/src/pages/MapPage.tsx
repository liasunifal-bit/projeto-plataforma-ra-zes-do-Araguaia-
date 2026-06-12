import { useState } from 'react';
import { Header } from '@/app/layout/Headers';
import { BottomNav } from '@/app/layout/BottomNav';
import { LocalMap } from '../features/map/components/LocalMap';
import { MapCategoryFilters } from '../features/map/components/MapCategoryFilters';

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Define as classes do contêiner dinamicamente com base no estado de tela cheia
  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-[1000] w-screen h-[100dvh] bg-background text-foreground flex flex-col overflow-hidden'
    : 'w-full max-w-md md:max-w-lg h-[100dvh] bg-background text-foreground flex flex-col relative shadow-2xl md:border-x md:border-border/20 overflow-hidden';

  return (
    <div className="min-h-screen w-full bg-muted/40 flex justify-center overflow-hidden">
      {/* Container "Celular Virtual" PWA - Expande para tela cheia condicionalmente */}
      <div className={containerClasses}>
        {/* ─────────────── CABEÇALHO ─────────────── */}
        <Header title="Mapa do Araguaia" />

        {/* ─────────────── CONTEÚDO PRINCIPAL ─────────────── */}
        <main className="flex flex-col gap-0 flex-1 relative overflow-hidden pb-20">
          {/* Filtros sobre o mapa */}
          <MapCategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Mapa com controle de tela cheia */}
          <LocalMap
            activeCategory={activeCategory}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
        </main>

        {/* ─────────────── NAVEGAÇÃO INFERIOR ─────────────── */}
        <BottomNav />
      </div>
    </div>
  );
}


