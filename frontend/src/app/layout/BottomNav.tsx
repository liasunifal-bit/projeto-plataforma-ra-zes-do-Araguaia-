import { Link, useLocation } from 'react-router-dom'
import { Home, Map, GraduationCap } from 'lucide-react'

export function BottomNav() {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Mapa', path: '/mapa', icon: Map },
    { label: 'Escolinha', path: '/escolinha', icon: GraduationCap },
  ]

  return (
    <nav 
      aria-label="Navegação principal" 
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-border/30 py-3.5 md:py-4 px-6 md:px-10 flex justify-around md:justify-center md:gap-20 items-center z-50 shadow-[0_-6px_20px_rgba(0,0,0,0.03)] rounded-t-2xl"
    >
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = currentPath === item.path

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 md:min-w-20 transition-all duration-200 select-none ${
              isActive 
                ? 'text-primary scale-105 font-bold' 
                : 'text-foreground/45 hover:text-foreground/75'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-wider">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
