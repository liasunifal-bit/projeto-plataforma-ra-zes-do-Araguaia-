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
    <header className="bg-primary text-white pt-6 md:pt-8 pb-8 md:pb-10 px-5 md:px-8 rounded-b-[2.5rem] shadow-md flex flex-col gap-4 md:gap-5">
      <div className="flex items-center gap-3.5 md:gap-5">
        <img
          src={logo}
          alt="Logo Raízes do Araguaia"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-contain bg-white p-1 shrink-0"
        />

        <h1
          className="font-heading font-bold italic text-white leading-tight"
          style={{ fontSize: '1.4rem', letterSpacing: '0.01em' }}
        >
          {title}
        </h1>
      </div>

      <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed max-w-[90%] md:max-w-2xl">
        Encontre produtos frescos e artesanato da nossa gente
      </p>
    </header>
  )
}
