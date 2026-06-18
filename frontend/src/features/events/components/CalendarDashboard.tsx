import { Calendar, CheckCircle2, Star } from 'lucide-react'
import type { CommunityEvent } from '../types'

type CalendarDashboardProps = {
  events: CommunityEvent[]
}

export function CalendarDashboard({ events }: CalendarDashboardProps) {
  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]

  // Eventos hoje
  const todayEvents = events.filter((e) => {
    const eDateStr = new Date(e.date).toISOString().split('T')[0]
    return eDateStr === todayStr
  })

  // Eventos futuros (a partir de hoje inclusive)
  const upcomingEvents = events.filter((e) => {
    const eventTime = new Date(e.date).getTime()
    // Define o início do dia de hoje para comparação justa
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    return eventTime >= startOfToday
  })

  // Eventos deste mês
  const thisMonthEvents = events.filter((e) => {
    const eDate = new Date(e.date)
    return eDate.getMonth() === now.getMonth() && eDate.getFullYear() === now.getFullYear()
  })

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Card 1: Hoje */}
      <div className="flex flex-col gap-1 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]">
        <div className="flex items-center justify-between gap-1 text-emerald-700">
          <span className="text-xs font-bold uppercase tracking-wider">Hoje</span>
          <Star className="h-4 w-4 fill-emerald-600 text-emerald-600 animate-pulse" />
        </div>
        <p className="font-heading text-2xl font-black text-emerald-950">{todayEvents.length}</p>
        <p className="text-[10px] font-medium text-emerald-800/70">feiras ativas</p>
      </div>

      {/* Card 2: Este Mês */}
      <div className="flex flex-col gap-1 rounded-2xl border border-amber-100 bg-amber-50/50 p-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]">
        <div className="flex items-center justify-between gap-1 text-amber-700">
          <span className="text-xs font-bold uppercase tracking-wider">Mês</span>
          <Calendar className="h-4 w-4 text-amber-600" />
        </div>
        <p className="font-heading text-2xl font-black text-amber-950">{thisMonthEvents.length}</p>
        <p className="text-[10px] font-medium text-amber-800/70">este mês</p>
      </div>

      {/* Card 3: Próximos */}
      <div className="flex flex-col gap-1 rounded-2xl border border-stone-200 bg-stone-50/50 p-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]">
        <div className="flex items-center justify-between gap-1 text-stone-600">
          <span className="text-xs font-bold uppercase tracking-wider">Agenda</span>
          <CheckCircle2 className="h-4 w-4 text-stone-500" />
        </div>
        <p className="font-heading text-2xl font-black text-stone-900">{upcomingEvents.length}</p>
        <p className="text-[10px] font-medium text-stone-600/70">planejados</p>
      </div>
    </div>
  )
}
