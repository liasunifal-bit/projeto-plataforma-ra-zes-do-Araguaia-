import logo from '@/assets/logo.png'

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 h-14 md:h-16 bg-white border-b border-border/40 flex items-center justify-between px-4 md:px-6 shadow-sm select-none">
      <div className="flex items-center gap-2 md:gap-3">
        <img
          src={logo}
          alt="Logo Raízes do Araguaia"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-contain bg-muted p-0.5 shrink-0"
        />
        <span className="font-heading font-black italic text-stone-800 text-sm md:text-base tracking-wide">
          Raízes do Araguaia
        </span>
      </div>

      <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] md:text-xs font-black uppercase tracking-wider px-2 md:px-3 py-0.5 md:py-1 rounded-full">
        Admin
      </span>
    </header>
  )
}
