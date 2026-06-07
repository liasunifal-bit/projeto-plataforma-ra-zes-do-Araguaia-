import { Search } from 'lucide-react'

type ProductSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <search className="block">
      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Buscar produto
        <span className="relative block">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/35"
          />
          <input
            aria-label="Buscar produto pelo nome"
            className="h-12 w-full rounded-2xl border border-border/40 bg-white pl-10 pr-4 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            placeholder="Ex.: peixe, farinha, cesto"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </span>
      </label>
    </search>
  )
}
