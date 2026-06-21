import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Check, X, ShieldCheck, ShoppingBag, User, Calendar, Volume2 } from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { listAdminProducts, updateProductStatus, type AdminProduct } from '@/features/admin/services/adminService'
import { ApprovalEmailModal } from '@/features/admin/components/ApprovalEmailModal'
import { ToastNotification } from '@/features/admin/components/ToastNotification'

export default function AdminProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState<AdminProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true)
      try {
        const products = await listAdminProducts()
        const found = products.find(p => p.id === id)
        if (found) {
          setProduct(found)
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handleActionClick = (type: 'approve' | 'reject') => {
    setActionType(type)
    setEmailModalOpen(true)
  }

  const handleConfirmEmail = async (subject: string, message: string) => {
    if (!product) return
    setEmailModalOpen(false)
    setIsLoading(true)
    
    try {
      // 1. Atualizar status do produto no banco (Supabase ou Mock)
      const newStatus = actionType === 'approve' ? 'published' : 'archived'
      await updateProductStatus(product.id, newStatus)
      
      // Simular envio de e-mail (imprimir no console)
      console.log(`E-mail enviado para ${product.sellerEmail} com assunto: "${subject}" e corpo: "${message}"`)

      // 2. Mostrar toast de sucesso
      setToastMessage(actionType === 'approve' ? 'Produto aprovado com sucesso!' : 'Produto rejeitado.')
      
      // Atualizar estado local
      setProduct(prev => prev ? { ...prev, status: newStatus } : null)
      
      // 3. Retornar ao Dashboard após um delay
      setTimeout(() => {
        navigate('/admin')
      }, 1500)
    } catch (error) {
      console.error('Erro ao atualizar status do produto:', error)
      alert('Ocorreu um erro ao salvar as alterações.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !product) {
    return (
      <AppShell>
        <PageHeader title="Carregando..." />
        <div className="flex-1 flex items-center justify-center text-stone-400 font-bold text-sm">
          Carregando dados...
        </div>
      </AppShell>
    )
  }

  if (!product) {
    return (
      <AppShell>
        <PageHeader title="Produto não encontrado" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-stone-400 font-bold text-sm">
          Produto não localizado ou excluído.
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <PageHeader title="Ficha do Produto" />

      <main className="flex-1 flex flex-col gap-6 px-4 pt-6 pb-6 overflow-y-auto bg-stone-50/50 md:px-6 lg:px-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        
        {/* Imagem do Produto */}
        <section className="w-full aspect-video rounded-3xl bg-stone-100 flex flex-col items-center justify-center text-stone-400 border border-stone-200/50 shadow-xs relative overflow-hidden select-none">
          <ShoppingBag size={48} className="opacity-30" />
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-2">
            Miniatura do Produto
          </span>
        </section>

        {/* Informações Principais */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-3.5 text-left">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                {product.categorySlug}
              </span>
              <h2 className="font-heading font-black text-stone-800 text-lg leading-tight mt-0.5">
                {product.name}
              </h2>
            </div>
            
            {product.status === 'published' ? (
              <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                <ShieldCheck size={11} />
                Aprovado
              </span>
            ) : product.status === 'draft' ? (
              <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0">
                Pendente
              </span>
            ) : (
              <span className="bg-red-500/10 text-red-600 border border-red-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0">
                Rejeitado
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1 mt-1 border-t border-stone-100 pt-3">
            <span className="text-2xl font-black text-stone-800">R$ {product.price.toFixed(2)}</span>
            {product.unit && <span className="text-stone-400 font-semibold text-xs">/ {product.unit}</span>}
          </div>
          
          {product.description && (
            <p className="text-stone-600 text-xs font-semibold leading-relaxed pt-1">
              {product.description}
            </p>
          )}
        </section>

        {/* Áudio de Descrição */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-3 text-left">
          <h3 className="font-heading font-bold text-stone-800 text-xs uppercase tracking-wider">
            Recurso de Acessibilidade
          </h3>
          
          <div className="flex items-center gap-3 border border-dashed border-stone-200 rounded-2xl p-3.5 bg-stone-50/50">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Volume2 size={18} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-stone-700">Áudio de Descrição</span>
              <span className="text-[10px] text-stone-400 font-semibold mt-0.5">
                Simulado: Áudio gravado de 45 segundos anexado
              </span>
            </div>
          </div>
        </section>

        {/* Detalhes do Vendedor */}
        <section className="bg-white border border-border/40 p-5 rounded-3xl shadow-xs flex flex-col gap-4 text-left">
          <h3 className="font-heading font-bold text-stone-800 text-xs uppercase tracking-wider">
            Proprietário & Cadastro
          </h3>

          <div className="flex flex-col gap-3.5">
            {/* Vendedor */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <User size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  Vendedor
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{product.sellerName}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  E-mail do Proprietário
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">{product.sellerEmail}</span>
              </div>
            </div>

            {/* Data Cadastro */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                  Data de Envio
                </span>
                <span className="text-xs font-bold mt-1 text-stone-800">
                  {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                </span>
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
            Reprovar Produto
          </button>
          
          <button
            type="button"
            onClick={() => handleActionClick('approve')}
            className="flex-1 py-3 rounded-2xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-colors active:scale-[0.98]"
          >
            <Check size={15} strokeWidth={2.5} />
            Aprovar Produto
          </button>
        </div>

      </main>

      {/* Modal de E-mail de Aprovação/Rejeição */}
      <ApprovalEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onConfirm={handleConfirmEmail}
        recipientEmail={product.sellerEmail}
        itemName={product.name}
        actionType={actionType}
        itemType="product"
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
