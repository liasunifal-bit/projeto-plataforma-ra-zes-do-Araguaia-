import { GraduationCap, Map, PackagePlus, Store } from 'lucide-react'
import { Link } from 'react-router-dom'

import { appRoutes } from '@/app/routes'

const actions = [
  {
    title: 'Cadastrar produto',
    description: 'Anuncie um novo item no marketplace comunitario.',
    href: appRoutes.addProduct,
    icon: PackagePlus,
  },
  {
    title: 'Ver catalogo',
    description: 'Acompanhe os produtos publicados pela comunidade.',
    href: appRoutes.catalog,
    icon: Store,
  },
  {
    title: 'Mapa local',
    description: 'Encontre vendedores e pontos de interesse.',
    href: appRoutes.map,
    icon: Map,
  },
  {
    title: 'Escolinha',
    description: 'Acesse conteudos de apoio para vender melhor.',
    href: appRoutes.school,
    icon: GraduationCap,
  },
] as const

export function DashboardActions() {
  return (
    <section aria-labelledby="dashboard-actions-title" className="flex flex-col gap-3 md:gap-4">
      <header>
        <h2 id="dashboard-actions-title" className="font-heading text-lg font-bold text-foreground">
          Acoes rapidas
        </h2>
      </header>

      <nav aria-label="Navegacao da conta" className="grid gap-3 md:gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Link
              key={action.href}
              to={action.href}
              className="flex min-h-28 md:min-h-32 gap-3 md:gap-4 rounded-2xl border border-border/30 bg-white p-4 md:p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon aria-hidden="true" size={20} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">{action.title}</span>
                <span className="text-xs font-medium leading-relaxed text-foreground/55">
                  {action.description}
                </span>
              </span>
            </Link>
          )
        })}
      </nav>
    </section>
  )
}

