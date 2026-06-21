import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CommunityEvent } from '../types'

type CalendarGridProps = {
  events: CommunityEvent[]
  selectedDate: Date | null
  onDateSelect: (date: Date | null) => void
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function CalendarGrid({ events, selectedDate, onDateSelect }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Navegar meses
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // Gera os dias para preencher a grade do calendário (6 semanas x 7 dias = 42 dias)
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const cells: { date: Date; isCurrentMonth: boolean; dayNumber: number }[] = []

    // Dias do mês anterior
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      cells.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        dayNumber: day,
      })
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        dayNumber: i,
      })
    }

    // Dias do próximo mês para completar a grade de 42 células
    const remainingCells = 42 - cells.length
    for (let i = 1; i <= remainingCells; i++) {
      cells.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        dayNumber: i,
      })
    }

    return cells
  }, [year, month])

  // Mapeia eventos por dia no mês corrente
  const eventDaysMap = useMemo(() => {
    const map = new Set<string>()
    events.forEach((event) => {
      const eDate = new Date(event.date)
      const key = `${eDate.getFullYear()}-${eDate.getMonth()}-${eDate.getDate()}`
      map.add(key)
    })
    return map
  }, [events])

  const today = new Date()
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

  const handleDayClick = (cellDate: Date) => {
    if (selectedDate && selectedDate.toDateString() === cellDate.toDateString()) {
      onDateSelect(null) // Deseleciona se clicar no mesmo dia
    } else {
      onDateSelect(cellDate)
    }
  }

  return (
    <div className="rounded-3xl border border-stone-100 bg-stone-50/45 p-4 md:p-5 shadow-sm">
      {/* Controles de Cabeçalho do Mês */}
      <header className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-stone-800">
          {MONTH_NAMES[month]} de {year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Mês anterior"
            className="rounded-xl p-1.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="Próximo mês"
            className="rounded-xl p-1.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-1">
        {WEEKDAYS.map((day, idx) => (
          <span key={idx} className="text-[10px] font-black uppercase tracking-wider text-stone-400">
            {day}
          </span>
        ))}
      </div>

      {/* Grid de Dias */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {calendarCells.map((cell, idx) => {
          const cellKey = `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`
          const isToday = cellKey === todayKey
          const isSelected = selectedDate ? cellKey === `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}` : false
          const hasEvent = eventDaysMap.has(cellKey)

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleDayClick(cell.date)}
              className={`relative flex h-8 md:h-10 w-full items-center justify-center rounded-xl text-xs md:text-sm font-bold transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500/30 ${
                !cell.isCurrentMonth ? 'text-stone-300' : 'text-stone-700'
              } ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                  : isToday
                  ? 'bg-amber-100 text-amber-950 font-black'
                  : 'hover:bg-stone-100'
              }`}
            >
              {cell.dayNumber}
              {/* Indicador de evento */}
              {hasEvent && (
                <span
                  className={`absolute bottom-1 h-1 w-1 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-amber-500'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
