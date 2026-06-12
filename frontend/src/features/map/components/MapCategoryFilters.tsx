import { Filter } from 'lucide-react';

const CATEGORIES = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'comida', label: 'Comida' },
  { slug: 'artesanato', label: 'Artesanato' },
  { slug: 'peixe', label: 'Peixe' },
  { slug: 'servicos', label: 'Serviços' },
] as const;

type MapCategoryFiltersProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function MapCategoryFilters({ activeCategory, onCategoryChange }: MapCategoryFiltersProps) {
  return (
    <div
      className="absolute top-4 left-4 right-4 z-[1000] flex items-center gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex items-center gap-1.5 shrink-0 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-border/30">
        <Filter size={14} className="text-primary" />
      </div>

      <div className="flex items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap shadow-sm ${
              activeCategory === cat.slug
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-white/90 backdrop-blur-sm text-foreground/70 hover:bg-white hover:text-foreground border border-border/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
