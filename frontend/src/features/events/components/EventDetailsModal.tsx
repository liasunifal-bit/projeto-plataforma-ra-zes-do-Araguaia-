import { X, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import type { CommunityEvent } from '../types'

type EventDetailsModalProps = {
  event: CommunityEvent | null
  onClose: () => void
}

export function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  // Impede o scroll do fundo ao abrir o modal
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [event])

  // Tratar esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!event) return null

  const eDate = new Date(event.date)
  
  // Formatadores personalizados
  const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(eDate)
  const fullDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(eDate)
  const startTime = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(eDate)
  
  let timeString = `A partir das ${startTime}`
  if (event.endsAt) {
    const endTime = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(event.endsAt))
    timeString = `${startTime} às ${endTime}`
  }

  // URL do Google Maps
  const mapsQuery = encodeURIComponent(`${event.location}, Brejo Grande do Araguaia, Pará, Brasil`)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-stone-900/60 p-4 md:p-8 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md md:max-w-xl animate-in slide-in-from-bottom duration-300 rounded-3xl border border-stone-100 bg-white p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-4 top-4 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 active:scale-90"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Categoria ou Subtítulo */}
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
          Evento Comunitário
        </span>

        {/* Título */}
        <h2 id="modal-title" className="font-heading text-xl md:text-2xl font-extrabold text-stone-900 mt-1 mb-4 leading-snug">
          {event.title}
        </h2>

        {/* Detalhes rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl bg-stone-50 p-4 md:p-5 mb-4">
          {/* Data */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-emerald-600">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-black capitalize text-stone-800">{weekday}</p>
              <p className="text-xs text-stone-500">{fullDate}</p>
            </div>
          </div>

          {/* Horário */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-amber-600">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-black text-stone-800">Horário</p>
              <p className="text-xs text-stone-500">{timeString}</p>
            </div>
          </div>

          {/* Local */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-stone-500">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-black text-stone-800">Localização</p>
              <p className="text-xs text-stone-500">{event.location}</p>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-2">
            Descrição do Evento
          </h3>
          <p className="text-sm font-medium leading-relaxed text-stone-600 max-h-36 overflow-y-auto pr-1">
            {event.description || 'Nenhuma descrição detalhada disponível para este evento.'}
          </p>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 py-3 text-center text-sm font-bold text-white transition-all active:scale-95 shadow-sm"
          >
            Como Chegar
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3 text-sm font-bold text-stone-600 transition-all hover:bg-stone-100 active:scale-95"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
