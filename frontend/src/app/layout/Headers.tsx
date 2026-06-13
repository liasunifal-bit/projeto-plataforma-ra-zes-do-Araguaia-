/**
 * Header usado exclusivamente na HomePage.
 * Exibe o logo da marca
 * Não possui navegação de volta — é o ponto de entrada da aplicação.
 */

import logo from '@/assets/logo.png'

type HeaderProps = {
  title?: string
}

export function Header({ title = 'Raízes do Araguaia' }: HeaderProps) {
  return (
    <header className="bg-primary text-white pt-6 pb-8 px-5 rounded-b-[2.5rem] shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-3.5">
        <img
          src={logo}
          alt="Logo Raízes do Araguaia"
          className="w-16 h-16 rounded-full object-contain bg-white p-1 shrink-0"
        />

        <h1
          className="font-heading font-bold italic text-white leading-tight"
          style={{ fontSize: '1.4rem', letterSpacing: '0.01em' }}
        >
          {title}
        </h1>
      </div>

      <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[90%]">
        Encontre produtos frescos e artesanato da nossa gente
      </p>
    </header>
  )
}
