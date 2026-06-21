/**
 * Header padrão para páginas internas (catálogo, categoria, produto, etc).
 * Exibe um botão de voltar (seta) e o título da página atual.
 * Usado em todas as páginas, exceto a HomePage.
 */

import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

type PageHeaderProps = {
  title: string
  action?: React.ReactNode
}

export function PageHeader({ title, action }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="bg-primary text-white px-5 md:px-8 py-4 md:py-5 rounded-b-[2rem] shadow-md flex items-center justify-between gap-3 md:gap-5">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-white/10 transition-colors -ml-2"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>

        <h1 className="font-heading font-bold text-lg md:text-xl leading-tight truncate">{title}</h1>
      </div>

      {action && <div className="flex items-center">{action}</div>}
    </header>
  )
}
