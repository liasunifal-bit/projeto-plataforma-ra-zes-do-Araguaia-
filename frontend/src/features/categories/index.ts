import { artesanatoCategory } from './artesanato'
import { comidaCategory } from './comida'
import { peixeCategory } from './peixe'
import { servicosCategory } from './servicos'
import type { AppCategoryModule, AppCategorySlug } from './types'

export const appCategories = [
  comidaCategory,
  artesanatoCategory,
  servicosCategory,
  peixeCategory,
] as const satisfies readonly AppCategoryModule[]

export const appCategoryBySlug = appCategories.reduce(
  (categories, category) => ({
    ...categories,
    [category.slug]: category,
  }),
  {} as Record<AppCategorySlug, AppCategoryModule>,
)

export type { AppCategoryModule, AppCategorySlug }
