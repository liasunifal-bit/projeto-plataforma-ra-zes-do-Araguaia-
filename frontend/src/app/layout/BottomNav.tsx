import { GraduationCap, Home, Map } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function BottomNav() {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { label: 'Inicio', path: '/', icon: Home },
    { label: 'Mapa', path: '/mapa', icon: Map },
    { label: 'Escolinha', path: '/escolinha', icon: GraduationCap },
  ]

  return (
    <nav
      aria-label="Navegacao principal"
      className="sticky bottom-0 z-50 border-t border-border/30 bg-white px-4 py-3 shadow-[0_-6px_20px_rgba(0,0,0,0.03)] md:px-8 lg:rounded-t-2xl"
    >
      <div className="mx-auto flex w-full max-w-4xl items-center justify-around gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex min-h-12 min-w-20 select-none flex-col items-center justify-center gap-1 rounded-xl px-3 transition-all duration-200 md:min-w-28 md:flex-row md:gap-2 ${
                isActive
                  ? 'scale-105 bg-primary/10 font-bold text-primary'
                  : 'text-foreground/45 hover:bg-muted/50 hover:text-foreground/75'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider md:text-xs">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
