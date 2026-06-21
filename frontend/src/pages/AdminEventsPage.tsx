import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, Calendar, MapPin, User, ShieldCheck } from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { listAdminEvents, type AdminEvent } from '@/features/admin/services/adminService'

type TabType = 'all' | 'pending' | 'approved' | 'rejected'

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('pending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true)
      try {
        const data = await listAdminEvents()
        setEvents(data)
      } catch (error) {
        console.error('Erro ao buscar lista de eventos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  // Filtragem e busca usando useMemo
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // 1. Filtro por status
      if (activeTab === 'pending' && event.status !== 'draft') return false
      if (activeTab === 'approved' && event.status !== 'published') return false
      if (activeTab === 'rejected' && event.status !== 'archived') return false

      // 2. Filtro de busca
      const searchLower = search.toLowerCase()
      return (
        event.title.toLowerCase().includes(searchLower) ||
        (event.description && event.description.toLowerCase().includes(searchLower)) ||
        event.locationName.toLowerCase().includes(searchLower) ||
        event.creatorName.toLowerCase().includes(searchLower)
      )
    })
  }, [events, search, activeTab])

  function formatDate(isoString: string) {
    const date = new Date(isoString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AppShell>
      <PageHeader title="Análise de Feiras e Eventos" />

      {/* Barra de busca e Filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 px-4 md:px-6 pt-4 md:pt-5 pb-2 md:pb-3 bg-stone-50/50">
        
        {/* Campo de Busca */}
        <div className="relative md:flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar evento, local, criador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs font-semibold outline-none focus:border-primary bg-white text-stone-800 transition-colors"
          />
        </div>

        {/* Abas */}
        <div className="flex bg-stone-100 p-1 rounded-xl md:w-auto md:min-w-80">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((tab) => {
            const label = 
              tab === 'pending' ? 'Pendentes' :
              tab === 'approved' ? 'Aprovados' :
              tab === 'rejected' ? 'Rejeitados' : 'Todos'
            
            const isActive = activeTab === tab

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-stone-800 shadow-xs' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col gap-4 md:gap-5 px-4 md:px-6 pt-3 md:pt-4 pb-6 md:pb-8 overflow-y-auto">
        
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-sm text-stone-400 font-bold">
            Carregando eventos...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-stone-200 rounded-3xl bg-white mt-4">
            <Calendar size={40} className="text-stone-300 mb-2" />
            <h4 className="font-bold text-sm text-stone-600">Nenhum evento encontrado</h4>
            <p className="text-xs text-stone-400 mt-1 text-center">Não existem registros correspondentes a este status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-3.5">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                to={`/admin/evento/${event.id}`}
                className="p-4 rounded-3xl border border-border/40 bg-white flex items-center justify-between hover:border-primary/30 hover:shadow-xs transition-all group"
              >
                <div className="flex flex-col gap-2 text-left max-w-[85%] md:max-w-[90%]">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-extrabold text-stone-800 text-sm leading-tight line-clamp-1">
                      {event.title}
                    </h3>
                    
                    {event.status === 'published' ? (
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0">
                        <ShieldCheck size={10} />
                        Ativo
                      </span>
                    ) : event.status === 'draft' ? (
                      <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0">
                        Pendente
                      </span>
                    ) : (
                      <span className="bg-red-500/10 text-red-600 border border-red-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0">
                        Rejeitado
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 mt-0.5">
                    <div className="flex items-center gap-1.5 text-stone-500 text-xs font-bold">
                      <Calendar size={13} className="text-primary shrink-0" />
                      <span>{formatDate(event.startsAt)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-stone-400 text-xs font-semibold">
                      <MapPin size={13} className="shrink-0" />
                      <span className="truncate">{event.locationName}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-stone-400 text-[11px] font-semibold">
                      <User size={13} className="shrink-0" />
                      <span className="truncate">Organizado por: {event.creatorName}</span>
                    </div>
                  </div>
                </div>

                <ChevronRight size={18} className="text-stone-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        )}

      </main>
    </AppShell>
  )
}
