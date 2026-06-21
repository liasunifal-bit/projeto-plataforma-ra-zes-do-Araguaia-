import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Check, X, ShieldCheck, Calendar, MapPin, User } from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { listAdminEvents, updateEventStatus, type AdminEvent } from '@/features/admin/services/adminService'
import { ApprovalEmailModal } from '@/features/admin/components/ApprovalEmailModal'
import { ToastNotification } from '@/features/admin/components/ToastNotification'

export default function AdminEventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [event, setEvent] = useState<AdminEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    async function loadEvent() {
      setIsLoading(true)
      try {
        const events = await listAdminEvents()
        const found = events.find(e => e.id === id)
        if (found) {
          setEvent(found)
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do evento:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvent()
  }, [id])

  const handleActionClick = (type: 'approve' | 'reject') => {
    setActionType(type)
    setEmailModalOpen(true)
  }

  const handleConfirmEmail = async (subject: string, message: string) => {
    if (!event) return
    setEmailModalOpen(false)
    setIsLoading(true)
    
    try {
      // 1. Atualizar status do evento no banco (Supabase ou Mock)
      const newStatus = actionType === 'approve' ? 'published' : 'archived'
      await updateEventStatus(event.id, newStatus)
      
      // Simular envio de e-mail (imprimir no console)
      console.log(`E-mail enviado para ${event.creatorEmail} com assunto: "${subject}" e corpo: "${message}"`)

      // 2. Mostrar toast de sucesso
      setToastMessage(actionType === 'approve' ? 'Evento aprovado com sucesso!' : 'Evento rejeitado.')
      
      // Atualizar estado local
      setEvent(prev => prev ? { ...prev, status: newStatus } : null)
      
      // 3. Retornar ao Dashboard após um delay
      setTimeout(() => {
        navigate('/admin')
      }, 1500)
    } catch (error) {
      console.error('Erro ao atualizar status do evento:', error)
      alert('Ocorreu um erro ao salvar as alterações.')
    } finally {
      setIsLoading(false)
    }
  }

  function formatDateTime(isoString: string) {
    const date = new Date(isoString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading && !event) {
    return (
      <AppShell>
        <PageHeader title="Carregando..." />
        <div className="flex-1 flex items-center justify-center text-stone-400 font-bold text-sm">
          Carregando dados...
        </div>
      </AppShell>
    )
  }

  if (!event) {
    return (
      <AppShell>
        <PageHeader title="Evento não encontrado" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-stone-400 font-bold text-sm">
          Evento não localizado ou excluído.
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <PageHeader title="Ficha do Evento" />

      <main className="flex-1 flex flex-col gap-6 px-4 pt-6 pb-6 overflow-y-auto bg-stone-50/50 md:px-6 lg:px-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        
        {/* Título e Status */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-3.5 text-left">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="bg-[#7c3aed]/10 text-[#7c3aed] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md self-start">
                Feira / Encontro
              </span>
              <h2 className="font-heading font-black text-stone-800 text-lg leading-tight mt-2">
                {event.title}
              </h2>
            </div>
            
            {event.status === 'published' ? (
              <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                <ShieldCheck size={11} />
                Aprovado
              </span>
            ) : event.status === 'draft' ? (
              <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0">
                Pendente
              </span>
            ) : (
              <span className="bg-red-500/10 text-red-600 border border-red-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0">
                Rejeitado
              </span>
            )}
          </div>

          {event.description && (
            <p className="text-stone-600 text-xs font-semibold leading-relaxed border-t border-stone-100 pt-3 mt-1">
              {event.description}
            </p>
          )}
        </section>

        {/* Data e Localização */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-4 text-left">
          <h3 className="font-heading font-bold text-stone-800 text-xs uppercase tracking-wider">
            Data, Hora & Localização
          </h3>

          <div className="flex flex-col gap-3.5">
            {/* Starts At */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  Início do Evento
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{formatDateTime(event.startsAt)}</span>
              </div>
            </div>

            {/* Ends At */}
            {event.endsAt && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                  <Calendar size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                    Término do Evento
                  </span>
                  <span className="text-xs font-bold mt-1 text-stone-800">{formatDateTime(event.endsAt)}</span>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  Local de Realização
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800 break-words">{event.locationName}</span>
                {event.latitude && event.longitude && (
                  <span className="text-[10px] text-stone-400 font-semibold mt-1">
                    Lat: {event.latitude.toFixed(6)} | Long: {event.longitude.toFixed(6)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Organizador */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-4 text-left">
          <h3 className="font-heading font-bold text-stone-800 text-xs uppercase tracking-wider">
            Organização
          </h3>

          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <User size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  Criador do Evento
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{event.creatorName}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  E-mail de Notificação
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{event.creatorEmail}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ações de Aprovação / Reprovação */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => handleActionClick('reject')}
            className="flex-1 py-3 rounded-2xl border border-red-200 bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors active:scale-[0.98]"
          >
            <X size={15} strokeWidth={2.5} />
            Reprovar Evento
          </button>
          
          <button
            type="button"
            onClick={() => handleActionClick('approve')}
            className="flex-1 py-3 rounded-2xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-colors active:scale-[0.98]"
          >
            <Check size={15} strokeWidth={2.5} />
            Aprovar Evento
          </button>
        </div>

      </main>

      {/* Modal de E-mail de Aprovação/Rejeição */}
      <ApprovalEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onConfirm={handleConfirmEmail}
        recipientEmail={event.creatorEmail}
        itemName={event.title}
        actionType={actionType}
        itemType="event"
      />

      {/* Notificação Toast */}
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
    </AppShell>
  )
}
