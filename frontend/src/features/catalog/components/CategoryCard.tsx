import { Link } from 'react-router-dom'
import { Utensils, ShoppingBasket, Fish, Wrench } from 'lucide-react'
import type { AppCategoryModule } from '@/features/categories'

const iconMap = {
  utensils: Utensils,
  'shopping-basket': ShoppingBasket,
  fish: Fish,
  wrench: Wrench,
} as const

type CategoryCardProps = {
  category: AppCategoryModule
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.iconName as keyof typeof iconMap] || Utensils

  return (
    <Link
      to={`/catalogo/${category.slug}`}
      style={{ backgroundColor: category.tone.background }}
      className="flex flex-col items-center justify-center p-5 rounded-2xl aspect-square text-white shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 select-none group"
    >
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
        <IconComponent size={24} className="text-white" strokeWidth={2} />
      </div>
      <span className="font-heading font-bold text-base tracking-wide">{category.label}</span>
    </Link>
  )
}
