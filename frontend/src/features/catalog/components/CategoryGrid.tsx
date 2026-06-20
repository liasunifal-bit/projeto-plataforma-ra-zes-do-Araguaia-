import { appCategories } from '@/features/categories'
import { CategoryCard } from './CategoryCard'
import { Link } from 'react-router-dom'
import { Calendar, Map } from 'lucide-react'

export function CategoryGrid() {
  return (
    <div className="flex flex-col gap-4">
      {/* Grade 2x2 de Categorias */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
        {appCategories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>

      {/* Cartões Auxiliares Horizontais */}
      <div className="flex flex-col gap-3 mt-1 md:grid md:grid-cols-2 lg:gap-4">
        <Link
          to="/calendario"
          className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/30 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group"
        >
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Calendar size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-base text-foreground leading-tight">
              Calendário de Feiras
            </span>
            <span className="text-xs text-foreground/50 leading-normal mt-0.5">
              Datas e locais das próximas feiras da região
            </span>
          </div>
        </Link>

        <Link
          to="/mapa"
          className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/30 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group"
        >
          <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Map size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-base text-foreground leading-tight">
              Produtores no Mapa
            </span>
            <span className="text-xs text-foreground/50 leading-normal mt-0.5">
              Encontre produtores pertinho de você
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
