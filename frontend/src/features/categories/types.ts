export type AppCategorySlug = 'comida' | 'artesanato' | 'servicos' | 'peixe'

export type AppCategoryTone = {
  background: string
  foreground: string
}

export type AppCategoryModule = {
  slug: AppCategorySlug
  label: string
  description: string
  iconName: string
  tone: AppCategoryTone
}
