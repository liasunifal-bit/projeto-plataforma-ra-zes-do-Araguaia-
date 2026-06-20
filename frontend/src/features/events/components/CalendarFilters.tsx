import { Search, MapPin, Calendar, X } from 'lucide-react'
import { useMemo } from 'react'
import type { CommunityEvent } from '../types'

type CalendarFiltersProps = {
  events: CommunityEvent[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedMonth: string
  onMonthChange: (month: string) => void
  selectedLocation: string
  onLocationChange: (location: string) => void
}

const MONTHS_LITERALS = [
  { value: 'all', label: 'Todos os meses' },
  { value: '0', label: 'Janeiro' },
  { value: '1', label: 'Fevereiro' },
  { value: '2', label: 'Março' },
  { value: '3', label: 'Abril' },
  { value: '4', label: 'Maio' },
  { value: '5', label: 'Junho' },
  { value: '6', label: 'Julho' },
  { value: '7', label: 'Agosto' },
  { value: '8', label: 'Setembro' },
  { value: '9', label: 'Outubro' },
  { value: '10', label: 'Novembro' },
  { value: '11', label: 'Dezembro' },
]

export function CalendarFilters({
  events,
  searchQuery,
  onSearchChange,
  selectedMonth,
  onMonthChange,
  selectedLocation,
  onLocationChange,
}: CalendarFiltersProps) {
  // Extrai localidades de forma única e dinâmica baseada nos eventos existentes
  const locations = useMemo(() => {
    const locs = events.map((e) => e.location.trim()).filter(Boolean)
    return Array.from(new Set(locs)).sort()
  }, [events])

  const hasActiveFilters = searchQuery !== '' || selectedMonth !== 'all' || selectedLocation !== 'all'

  const clearFilters = () => {
    onSearchChange('')
    onMonthChange('all')
    onLocationChange('all')
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Input de Busca */}
      <div className="relative flex items-center">
        <span className="absolute left-4 text-stone-400">
          <Search className="h-5 w-5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar feiras, eventos..."
          aria-label="Buscar eventos por título ou local"
          className="w-full rounded-2xl border border-stone-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdowns de Filtro */}
      <div className="grid grid-cols-2 gap-2">
        {/* Filtro de Mês */}
        <div className="relative flex items-center">
          <span className="absolute left-3 text-stone-500 pointer-events-none">
            <Calendar className="h-4 w-4" />
          </span>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            aria-label="Filtrar por mês"
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-2 text-xs font-bold text-stone-700 outline-none appearance-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
          >
            {MONTHS_LITERALS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Local */}
        <div className="relative flex items-center">
          <span className="absolute left-3 text-stone-500 pointer-events-none">
            <MapPin className="h-4 w-4" />
          </span>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            aria-label="Filtrar por local"
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-2 text-xs font-bold text-stone-700 outline-none appearance-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
          >
            <option value="all">Todos os locais</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botão de Limpar Filtros */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="self-end text-xs font-bold text-emerald-600 hover:text-emerald-700 active:scale-95 transition-all flex items-center gap-1"
        >
          Limpar filtros
        </button>
      )}
    </div>
  )
}
