import { useState, useTransition, useMemo } from 'react'
import { Calendar, Clock, FileText, MapPin, AlertCircle, Sparkles } from 'lucide-react'
import { LocationPicker } from './LocationPicker'
import { EventCard } from './EventCard'
import { createEvent } from '../services/eventService'
import type { CommunityEvent } from '../types'

type EventFormProps = {
  onSubmitSuccess: () => void
}

export function EventForm({ onSubmitSuccess }: EventFormProps) {
  // Estados do formulário
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [locationName, setLocationName] = useState('')
  const [latitude, setLatitude] = useState<number | undefined>(-5.7032) // Padrão Brejo Grande
  const [longitude, setLongitude] = useState<number | undefined>(-48.4048)
  const [category, setCategory] = useState('comida')
  const [status, setStatus] = useState<'draft' | 'published'>('published')

  // Estados de controle e feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Coordenadas alteradas pelo clique no mapa
  const handleLocationChange = (lat: number, lng: number) => {
    setLatitude(parseFloat(lat.toFixed(6)))
    setLongitude(parseFloat(lng.toFixed(6)))
  }

  // Objeto para preview em tempo real
  const previewEvent: CommunityEvent = useMemo(() => ({
    id: 'preview',
    title: title || 'Título do Evento Comunitário',
    date: startsAt ? new Date(startsAt).toISOString() : new Date().toISOString(),
    endsAt: endsAt ? new Date(endsAt).toISOString() : undefined,
    location: locationName || 'Nome do Local',
    description: description || 'Descreva seu evento comunitário acima.',
  }), [title, startsAt, endsAt, locationName, description])

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Validações básicas de campos obrigatórios
    if (!title.trim()) return setErrorMessage('O título do evento é obrigatório.')
    if (!description.trim()) return setErrorMessage('A descrição do evento é obrigatória.')
    if (!startsAt) return setErrorMessage('A data e hora de início são obrigatórias.')
    if (!locationName.trim()) return setErrorMessage('O nome da localização é obrigatório.')
    if (latitude === undefined || longitude === undefined) {
      return setErrorMessage('Por favor, marque a localização do evento no mapa.')
    }

    // Validação de datas
    const startDate = new Date(startsAt)
    if (endsAt) {
      const endDate = new Date(endsAt)
      if (endDate <= startDate) {
        return setErrorMessage('A data e hora de término devem ser posteriores ao início.')
      }
    }

    startTransition(async () => {
      try {
        await createEvent({
          title,
          description,
          startsAt: startDate.toISOString(),
          endsAt: endsAt ? new Date(endsAt).toISOString() : undefined,
          locationName,
          latitude,
          longitude,
          status,
        })
        onSubmitSuccess()
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Erro desconhecido ao salvar o evento.')
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ────────────── PREVIEW EM TEMPO REAL ────────────── */}
      <section aria-label="Pré-visualização do Evento" className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-600">
          <Sparkles className="h-4 w-4" />
          <span>Pré-visualização em tempo real</span>
        </div>
        <EventCard event={previewEvent} onOpenDetails={() => {}} />
      </section>

      {/* ────────────── FORMULÁRIO ────────────── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {errorMessage && (
          <div role="alert" className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-xs font-semibold text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. Título do Evento */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-title" className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1">
            <FileText className="h-4 w-4 text-stone-400" />
            Título do Evento *
          </label>
          <input
            id="event-title"
            type="text"
            required
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Feira de Orgânicos da Comunidade"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>

        {/* 2. Descrição */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-desc" className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1">
            <FileText className="h-4 w-4 text-stone-400" />
            Descrição *
          </label>
          <textarea
            id="event-desc"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva as atividades, produtos à venda, ou objetivo do evento comunitário..."
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 resize-none"
          />
        </div>

        {/* 3. Nome do Local */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-location-name" className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="h-4 w-4 text-stone-400" />
            Nome do Local *
          </label>
          <input
            id="event-location-name"
            type="text"
            required
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Ex: Praça Central de Brejo Grande"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>

        {/* 4. Mapa Selector (LocationPicker) */}
        <LocationPicker
          latitude={latitude}
          longitude={longitude}
          onChange={handleLocationChange}
        />

        {/* 5. Coordenadas Exibidas (Read-only) */}
        <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-100">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-stone-400">Latitude</span>
            <input
              type="text"
              readOnly
              value={latitude ?? ''}
              className="bg-transparent text-xs font-bold text-stone-700 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-stone-400">Longitude</span>
            <input
              type="text"
              readOnly
              value={longitude ?? ''}
              className="bg-transparent text-xs font-bold text-stone-700 outline-none"
            />
          </div>
        </div>

        {/* 6. Datas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-starts" className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="h-4 w-4 text-stone-400" />
              Início *
            </label>
            <input
              id="event-starts"
              type="datetime-local"
              required
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs font-bold text-stone-700 outline-none transition-all focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-ends" className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1">
              <Clock className="h-4 w-4 text-stone-400" />
              Término
            </label>
            <input
              id="event-ends"
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs font-bold text-stone-700 outline-none transition-all focus:border-emerald-500"
            />
          </div>
        </div>

        {/* 7. Categoria e Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-category" className="text-xs font-black text-stone-700 uppercase tracking-wider">
              Categoria
            </label>
            <select
              id="event-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs font-bold text-stone-700 outline-none appearance-none transition-all focus:border-emerald-500"
            >
              <option value="comida">🍽️ Comida/Feira</option>
              <option value="artesanato">🎨 Artesanato</option>
              <option value="peixe">🐟 Pesca/Feira</option>
              <option value="servicos">🔧 Serviços</option>
              <option value="outro">🌟 Outro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-status" className="text-xs font-black text-stone-700 uppercase tracking-wider">
              Status Inicial
            </label>
            <select
              id="event-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs font-bold text-stone-700 outline-none appearance-none transition-all focus:border-emerald-500"
            >
              <option value="published">🟢 Publicado (Imediato)</option>
              <option value="draft">🟡 Rascunho (Privado)</option>
            </select>
          </div>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 py-3.5 text-center text-sm font-bold text-white transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
        >
          {isPending ? 'Salvando Evento...' : 'Cadastrar Evento Comunitário'}
        </button>
      </form>
    </div>
  )
}


