import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { PageHeader } from '@/app/layout/PageHeader'
import {
  useEvents,
  CalendarDashboard,
  CalendarFilters,
  CalendarGrid,
  EventCard,
  EventDetailsModal,
} from '@/features/events'
import type { CommunityEvent } from '@/features/events'

export default function CalendarPage() {
  const events = useEvents()

  // Estados dos filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Estado do modal de detalhes
  const [activeEvent, setActiveEvent] = useState<CommunityEvent | null>(null)

  // Estado de simulação de carregamento para efeito Skeleton
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (events.length > 0) {
      setIsLoading(false)
    } else {
      const timer = setTimeout(() => setIsLoading(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [events])

  // Filtragem dos eventos
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Busca textual (título, local ou descrição)
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()))

      // 2. Filtro de Mês
      const eDate = new Date(event.date)
      const matchesMonth = selectedMonth === 'all' || eDate.getMonth().toString() === selectedMonth

      // 3. Filtro de Local
      const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation

      // 4. Filtro de Dia do Calendário
      const matchesDate =
        !selectedDate ||
        (eDate.getDate() === selectedDate.getDate() &&
          eDate.getMonth() === selectedDate.getMonth() &&
          eDate.getFullYear() === selectedDate.getFullYear())

      return matchesSearch && matchesMonth && matchesLocation && matchesDate
    })
  }, [events, searchQuery, selectedMonth, selectedLocation, selectedDate])

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedMonth('all')
    setSelectedLocation('all')
    setSelectedDate(null)
  }

  return (
    <AppShell>
      <PageHeader
        title="Agenda"
        action={
          <Link
            to="/cadastrar-evento"
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-1.5 text-xs font-bold transition-all active:scale-95 shadow-sm"
            aria-label="Cadastrar novo evento"
          >
            <Plus size={14} strokeWidth={3} />
            <span>Divulgar</span>
          </Link>
        }
      />
      
      <main className="flex flex-1 flex-col gap-6 md:gap-8 overflow-y-auto px-4 md:px-6 pb-6 md:pb-8 pt-6 md:pt-8">
        {/* Bloco de Introdução */}
        <header className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
            Agenda Local
          </span>
          <h1 className="font-heading text-2xl md:text-3xl font-bold leading-tight text-stone-900">
            Feiras e Eventos da Comunidade
          </h1>
          <p className="text-xs md:text-sm font-semibold leading-relaxed text-stone-500">
            Acompanhe o calendário de feiras, mutirões de produtores e datas importantes da nossa região.
          </p>
        </header>

        {/* Dashboard de Métricas */}
        <CalendarDashboard events={events} />

        {/* Calendário Mensal Compacto */}
        <section aria-label="Visualização em Calendário">
          <CalendarGrid
            events={events}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </section>

        {/* Barra de Filtros */}
        <section aria-label="Busca e filtros da agenda">
          <CalendarFilters
            events={events}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
          />
        </section>

        {/* Listagem de Cards */}
        <section aria-labelledby="events-list-title" className="flex flex-col gap-4">
          <header className="flex items-center justify-between gap-3">
            <h2 id="events-list-title" className="font-heading text-base font-black text-stone-800">
              {selectedDate ? 'Eventos do Dia' : 'Lista de Eventos'}
            </h2>
            <span className="text-[10px] font-black uppercase tracking-wide text-stone-400">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'evento' : 'eventos'}
            </span>
          </header>

          {/* Estado de Carregamento */}
          {isLoading && <CalendarSkeleton />}

          {/* Estado Carregado e Lista Vazia */}
          {!isLoading && filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-200 bg-stone-50/50 px-6 py-10 text-center">
              <p className="text-sm font-bold text-stone-500 mb-4">
                Nenhum evento corresponde aos filtros selecionados.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-emerald-700 active:scale-95 shadow-sm"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}

          {/* Lista de Cards com Transição Suave */}
          {!isLoading && filteredEvents.length > 0 && (
            <div className="flex flex-col gap-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onOpenDetails={setActiveEvent}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal de Detalhes do Evento */}
      <EventDetailsModal
        event={activeEvent}
        onClose={() => setActiveEvent(null)}
      />

      <BottomNav />
    </AppShell>
  )
}

// Skeleton Shimmer Loading
function CalendarSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 rounded-3xl border border-stone-100 bg-white p-4 shadow-sm animate-pulse">
          <div className="h-16 w-16 rounded-2xl bg-stone-100 shrink-0" />
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="h-4 w-3/4 rounded bg-stone-100" />
            <div className="space-y-2">
              <div className="h-3 w-1/2 rounded bg-stone-100" />
              <div className="h-3 w-1/3 rounded bg-stone-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

