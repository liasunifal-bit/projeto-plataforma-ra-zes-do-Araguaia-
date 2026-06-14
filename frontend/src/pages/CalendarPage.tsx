import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { Header } from '@/app/layout/Headers'
import { useEvents } from '@/features/events'
import { formatDate } from '@/shared/utils'

export default function CalendarPage() {
  const events = useEvents()

  return (
    <AppShell>
      <Header title="Calendario" />
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <h1 className="font-heading text-2xl font-bold">Eventos da comunidade</h1>
        {events.length === 0 && <p>Nenhum evento publicado no momento.</p>}
        {events.map((event) => (
          <article key={event.id} className="rounded-2xl border bg-white p-4">
            <h2 className="font-bold">{event.title}</h2>
            <p className="text-sm">{formatDate(event.date)} - {event.location}</p>
          </article>
        ))}
      </main>
      <BottomNav />
    </AppShell>
  )
}
