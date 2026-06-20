import logo from '@/assets/logo.png'

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 h-14 bg-white border-b border-border/40 flex items-center justify-between px-4 shadow-sm select-none">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo Raízes do Araguaia"
          className="w-8 h-8 rounded-full object-contain bg-muted p-0.5 shrink-0"
        />
        <span className="font-heading font-black italic text-stone-800 text-sm tracking-wide">
          Raízes do Araguaia
        </span>
      </div>

      <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
        Admin
      </span>
    </header>
  )
}
