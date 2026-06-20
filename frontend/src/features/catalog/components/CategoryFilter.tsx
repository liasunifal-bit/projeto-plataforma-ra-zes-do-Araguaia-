import { appCategories } from '@/features/categories'
import type { AppCategorySlug } from '@/features/categories'

type CategoryFilterProps = {
  selectedCategory?: AppCategorySlug | ''
  onChange: (category: AppCategorySlug | '') => void
}

export function CategoryFilter({ selectedCategory = '', onChange }: CategoryFilterProps) {
  return (
    <aside aria-label="Filtrar por categoria" className="flex flex-col gap-3">
      <h2 className="text-sm font-bold text-foreground">Categorias</h2>
      <nav aria-label="Categorias do catalogo" className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
        <button
          className={`h-10 shrink-0 rounded-full border px-4 text-xs font-bold uppercase tracking-wide transition ${
            selectedCategory === ''
              ? 'border-primary bg-primary text-white'
              : 'border-border/40 bg-white text-foreground/65 hover:text-foreground'
          }`}
          type="button"
          onClick={() => onChange('')}
        >
          Todas
        </button>

        {appCategories.map((category) => (
          <button
            key={category.slug}
            className={`h-10 shrink-0 rounded-full border px-4 text-xs font-bold uppercase tracking-wide transition ${
              selectedCategory === category.slug
                ? 'border-primary bg-primary text-white'
                : 'border-border/40 bg-white text-foreground/65 hover:text-foreground'
            }`}
            type="button"
            onClick={() => onChange(category.slug)}
          >
            {category.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
