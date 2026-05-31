import { appRoutes } from '@/app/routes'

export const rootNavigationItems = [
  { label: 'Inicio', to: appRoutes.home },
  { label: 'Mapa', to: appRoutes.map },
  { label: 'Escolinha', to: appRoutes.school },
] as const
