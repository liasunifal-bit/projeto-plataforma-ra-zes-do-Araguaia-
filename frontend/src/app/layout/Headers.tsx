import logo from '@/assets/logo.png'

type HeaderProps = {
  title?: string
}

export function Header({ title = 'Raizes do Araguaia' }: HeaderProps) {
  return (
    <header className="bg-primary px-5 pb-8 pt-6 text-white shadow-md md:px-8 lg:px-10 lg:pb-7 lg:pt-7">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3.5 md:gap-4">
          <img
            src={logo}
            alt="Logo Raizes do Araguaia"
            className="h-16 w-16 shrink-0 rounded-full bg-white object-contain p-1 md:h-18 md:w-18"
          />

          <h1 className="font-heading text-2xl font-bold italic leading-tight text-white md:text-3xl">
            {title}
          </h1>
        </div>

        <p className="max-w-xl text-sm font-medium leading-relaxed text-white/80 md:text-right md:text-base">
          Encontre produtos frescos e artesanato da nossa gente
        </p>
      </div>
    </header>
  )
}
