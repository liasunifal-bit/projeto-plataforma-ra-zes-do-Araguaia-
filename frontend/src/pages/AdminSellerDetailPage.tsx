import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Phone, MapPin, Key, Calendar, ShieldAlert, Check, X, ShieldCheck } from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { listAdminSellers, updateSellerStatus, type AdminSeller, sendEmailNotification } from '@/features/admin/services/adminService'
import { ApprovalEmailModal } from '@/features/admin/components/ApprovalEmailModal'
import { ToastNotification } from '@/features/admin/components/ToastNotification'

export default function AdminSellerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [seller, setSeller] = useState<AdminSeller | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    async function loadSeller() {
      setIsLoading(true)
      try {
        const sellers = await listAdminSellers()
        const found = sellers.find(s => s.id === id)
        if (found) {
          setSeller(found)
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do vendedor:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSeller()
  }, [id])

  const handleActionClick = (type: 'approve' | 'reject') => {
    setActionType(type)
    setEmailModalOpen(true)
  }

  const handleConfirmEmail = async (subject: string, message: string) => {
    if (!seller) return
    setEmailModalOpen(false)
    setIsLoading(true)
    
    try {
      // 1. Atualizar no banco de dados (Supabase ou Mock)
      const isPublished = actionType === 'approve'
      await updateSellerStatus(seller.id, isPublished)
      
      if (seller.email) {
        await sendEmailNotification({
          toEmail: seller.email,
          subject,
          message,
          itemName: seller.displayName,
        })
      }
      
      // Simular envio de e-mail (imprimir no console)
      console.log(`E-mail enviado para ${seller.email} com assunto: "${subject}" e corpo: "${message}"`)

      // 2. Mostrar toast de sucesso
      setToastMessage(isPublished ? 'Vendedor aprovado com sucesso!' : 'Vendedor rejeitado/inativado.')
      
      // Atualizar estado local
      setSeller(prev => prev ? { ...prev, isPublished } : null)
      
      // 3. Retornar ao Dashboard após um delay para o toast
      setTimeout(() => {
        navigate('/admin')
      }, 1500)
    } catch (error) {
      console.error('Erro ao atualizar status do vendedor:', error)
      alert('Ocorreu um erro ao salvar as alterações.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !seller) {
    return (
      <AppShell>
        <PageHeader title="Carregando..." />
        <div className="flex-1 flex items-center justify-center text-stone-400 font-bold text-sm">
          Carregando dados...
        </div>
      </AppShell>
    )
  }

  if (!seller) {
    return (
      <AppShell>
        <PageHeader title="Vendedor não encontrado" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-stone-400 font-bold text-sm">
          Vendedor não localizado ou excluído.
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <PageHeader title="Ficha do Vendedor" />

      <main className="flex-1 flex flex-col gap-6 px-4 pt-6 pb-6 overflow-y-auto bg-stone-50/50 md:px-6 lg:px-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        
        {/* Cartão de Identidade e Status */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-3 text-left">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h2 className="font-heading font-black text-stone-800 text-lg leading-tight">
                {seller.displayName}
              </h2>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mt-1">
                ID do Vendedor: {seller.id.substring(0, 8)}...
              </span>
            </div>
            
            {seller.isPublished ? (
              <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                <ShieldCheck size={11} />
                Aprovado
              </span>
            ) : (
              <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0">
                Pendente
              </span>
            )}
          </div>

          {seller.description && (
            <p className="text-stone-600 text-xs font-semibold leading-relaxed border-t border-stone-100 pt-3 mt-1">
              {seller.description}
            </p>
          )}
        </section>

        {/* Dados de Contato e Pix */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-4 text-left">
          <h3 className="font-heading font-bold text-stone-800 text-xs uppercase tracking-wider">
            Informações de Contato & Pix
          </h3>

          <div className="flex flex-col gap-3.5">
            {/* WhatsApp */}
            <div className="flex items-center gap-3 text-stone-700">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <Phone size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  WhatsApp / Telefone
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{seller.whatsappNumber}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-stone-700">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <ShieldAlert size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  E-mail do Vendedor
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{seller.email}</span>
              </div>
            </div>

            {/* Pix Key */}
            <div className="flex items-center gap-3 text-stone-700">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <Key size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  Chave Pix ({seller.pixKeyType?.toUpperCase() || 'Chave'})
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{seller.pixKey || 'Não cadastrada'}</span>
              </div>
            </div>

            {/* Data Cadastro */}
            <div className="flex items-center gap-3 text-stone-700">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  Data de Solicitação
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">
                  {new Date(seller.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Localização Geográfica */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-3 text-left">
          <h3 className="font-heading font-bold text-stone-800 text-xs uppercase tracking-wider">
            Localização e Coordenadas
          </h3>
          
          <div className="flex items-start gap-3 text-stone-700">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
              <MapPin size={16} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                Endereço / Assentamento
              </span>
              <span className="text-xs font-bold mt-1 text-stone-800 break-words">{seller.locationName}</span>
              
              {seller.latitude && seller.longitude && (
                <span className="text-[10px] text-stone-400 font-semibold mt-1">
                  Lat: {seller.latitude.toFixed(6)} | Long: {seller.longitude.toFixed(6)}
                </span>
              )}
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
            Reprovar Cadastro
          </button>
          
          <button
            type="button"
            onClick={() => handleActionClick('approve')}
            className="flex-1 py-3 rounded-2xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-colors active:scale-[0.98]"
          >
            <Check size={15} strokeWidth={2.5} />
            Aprovar Vendedor
          </button>
        </div>

      </main>

      {/* Modal de E-mail de Aprovação/Rejeição */}
      <ApprovalEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onConfirm={handleConfirmEmail}
        recipientEmail={seller.email}
        itemName={seller.displayName}
        actionType={actionType}
        itemType="seller"
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
