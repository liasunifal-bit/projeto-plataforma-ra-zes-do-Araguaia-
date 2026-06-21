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
    <header className="bg-primary text-white px-5 py-4 rounded-b-[2rem] shadow-md flex items-center justify-between gap-3 md:px-6 lg:px-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors -ml-2"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>

        <h1 className="font-heading font-bold text-lg leading-tight">{title}</h1>
      </div>

      {action && <div className="flex items-center">{action}</div>}
    </header>
  )
}