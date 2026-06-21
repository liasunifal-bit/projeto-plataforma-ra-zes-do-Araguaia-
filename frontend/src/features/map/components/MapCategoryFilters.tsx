import { Filter } from 'lucide-react';

const CATEGORIES = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'comida', label: 'Comida' },
  { slug: 'artesanato', label: 'Artesanato' },
  { slug: 'peixe', label: 'Peixe' },
  { slug: 'servicos', label: 'Serviços' },
  { slug: 'eventos', label: 'Eventos' },
] as const;

type MapCategoryFiltersProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function MapCategoryFilters({ activeCategory, onCategoryChange }: MapCategoryFiltersProps) {
  return (
    <div
      className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 z-[1000] flex items-center gap-2 md:gap-3 overflow-x-auto pb-1"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex items-center gap-1.5 shrink-0 bg-white/80 backdrop-blur-md rounded-full px-3 md:px-4 py-2 md:py-2.5 shadow-sm border border-border/30">
        <Filter size={14} className="text-primary" />
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-primary hover:text-white ${
              activeCategory === cat.slug
                ? 'bg-primary text-white shadow-md scale-105'
                : 'bg-white/80 backdrop-blur-md text-foreground/70 border border-border/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
