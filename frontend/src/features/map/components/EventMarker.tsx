import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapPin, Calendar, Clock } from 'lucide-react'
import type { CommunityEvent } from '@/features/events'

function createEventIcon() {
  const svgMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-[30px] h-[42px]">
      <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg" className="absolute z-10 drop-shadow-md">
        <path
          d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.716 23.284 0 15 0z"
          fill="#059669"
        />
        <circle cx="15" cy="14" r="7.5" fill="white" opacity="0.95" />
      </svg>
      {/* Pequeno ícone de calendário posicionado no centro do marcador */}
      <div className="absolute top-[8px] z-20 text-emerald-700">
        <Calendar size={11} strokeWidth={3} />
      </div>
      {/* Círculo pulsante animado por CSS */}
      <div 
        className="absolute top-[6px] w-[16px] h-[16px] rounded-full z-0 map-pin-pulse bg-emerald-600"
        style={{ opacity: 0.4 }}
      ></div>
    </div>
  )

  return L.divIcon({
    html: svgMarkup,
    className: 'custom-marker-icon-event',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  })
}

const eventIcon = createEventIcon()

export function EventMarker({ event }: { event: CommunityEvent }) {
  // Ignorar eventos sem coordenadas válidas
  if (event.latitude === undefined || event.longitude === undefined) {
    return null
  }

  // Formatar datas para exibição
  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoString
    }
  }

  return (
    <Marker position={[event.latitude, event.longitude]} icon={eventIcon}>
      <Popup>
        <div className="flex flex-col gap-2 p-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
              <Calendar size={12} strokeWidth={2.5} />
            </span>
            <h3 className="font-heading font-black text-sm text-stone-900 leading-tight">
              {event.title}
            </h3>
          </div>

          <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-full w-fit bg-emerald-50 text-emerald-700 border border-emerald-100">
            Feira / Evento
          </span>

          <div className="flex flex-col gap-1 text-xs text-stone-600 mt-1 bg-stone-50 p-2 rounded-xl border border-stone-100">
            <div className="flex items-center gap-1.5 font-semibold">
              <Clock size={12} className="text-stone-400" />
              <span>Início: {formatDateTime(event.date)}</span>
            </div>
            {event.endsAt && (
              <div className="flex items-center gap-1.5 font-semibold">
                <Clock size={12} className="text-stone-400" />
                <span>Fim: {formatDateTime(event.endsAt)}</span>
              </div>
            )}
            <div className="flex items-start gap-1.5 mt-1 border-t border-stone-200/50 pt-1.5 font-semibold">
              <MapPin size={12} className="text-stone-400 shrink-0 mt-0.5" />
              <span className="leading-tight">{event.location}</span>
            </div>
          </div>

          {event.description && (
            <p className="text-xs text-stone-500 mt-1 leading-relaxed italic border-l-2 border-emerald-500/30 pl-2">
              {event.description}
            </p>
          )}
        </div>
      </Popup>
    </Marker>
  )
}
