import { useState } from 'react'
import { MapPin, Clock, Share2, Check } from 'lucide-react'
import type { CommunityEvent } from '../types'

type EventCardProps = {
  event: CommunityEvent
  onOpenDetails: (event: CommunityEvent) => void
}

export function EventCard({ event, onOpenDetails }: EventCardProps) {
  const [copied, setCopied] = useState(false)

  const eDate = new Date(event.date)
  const day = eDate.getDate()
  
  // Abreviar mês (ex: "JUN")
  const monthAbbr = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
    .format(eDate)
    .replace('.', '')
    .toUpperCase()

  // Abreviar dia de semana (ex: "sex")
  const weekdayAbbr = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
    .format(eDate)
    .replace('.', '')

  // Horário de início
  const startTime = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(eDate)

  // Status do evento (Hoje, Breve ou Passado)
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const eventDayStart = new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate()).getTime()

  let statusLabel = 'Breve'
  let statusClass = 'bg-amber-50 text-amber-800 border-amber-200'

  if (eventDayStart === todayStart) {
    statusLabel = 'Hoje'
    statusClass = 'bg-emerald-50 text-emerald-800 border-emerald-200 animate-pulse'
  } else if (eventDayStart < todayStart) {
    statusLabel = 'Encerrado'
    statusClass = 'bg-stone-100 text-stone-500 border-stone-200'
  }

  // Compartilhar evento
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation() // Impede abrir o modal de detalhes

    const dateStr = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(eDate)
    const shareText = `Confira este evento comunitário no Raízes do Araguaia:\n🌟 ${event.title}\n📍 Local: ${event.location}\n📅 Data: ${dateStr} às ${startTime}\nVenha prestigiar nossa gente!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: shareText,
          url: window.location.href,
        })
      } catch (err) {
        console.warn('Erro ao compartilhar nativamente:', err)
      }
    } else {
      // Fallback para Clipboard
      try {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Falha ao copiar:', err)
      }
    }
  }

  return (
    <article
      onClick={() => onOpenDetails(event)}
      className="flex items-stretch gap-4 md:gap-5 rounded-3xl border border-stone-100 bg-white p-4 md:p-5 shadow-sm transition-all hover:scale-[1.01] hover:border-emerald-200 hover:shadow-md active:scale-[0.99] cursor-pointer"
    >
      {/* Badge de Data em Estilo Calendário de Mesa */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-stone-50 border border-stone-100 px-3 md:px-4 py-2 md:py-3 w-16 md:w-20 text-center shrink-0">
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
          {monthAbbr}
        </span>
        <span className="text-2xl font-black text-stone-900 leading-none my-1">
          {day}
        </span>
        <span className="text-[10px] font-bold text-stone-400 capitalize">
          {weekdayAbbr}
        </span>
      </div>

      {/* Detalhes do Evento */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          {/* Título e Status */}
          <div className="flex flex-col gap-1.5">
            <h3 className="font-heading text-sm md:text-base font-extrabold text-stone-900 leading-snug break-words pr-2 line-clamp-2">
              {event.title}
            </h3>
            <span className={`inline-block self-start rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${statusClass}`}>
              {statusLabel}
            </span>
          </div>

          {/* Botão de Compartilhar */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartilhar evento"
            className="rounded-xl border border-stone-100 p-2 text-stone-400 transition-all hover:bg-stone-50 hover:text-emerald-600 active:scale-90"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600 animate-bounce" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Metadados: Local e Hora */}
        <div className="mt-2.5 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0" />
            <span>{startTime}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
