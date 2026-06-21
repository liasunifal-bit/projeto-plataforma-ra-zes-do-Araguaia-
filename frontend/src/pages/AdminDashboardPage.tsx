import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  ShoppingBag, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { AdminHeader } from '@/features/admin/components/AdminHeader'
import { BottomNav } from '@/app/layout/BottomNav'
import { getAdminMetrics, listAdminProducts } from '@/features/admin/services/adminService'

type PeriodType = '7d' | '30d' | 'all'

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<PeriodType>('30d')
  const [metrics, setMetrics] = useState({
    sellersTotal: 0,
    sellersPending: 0,
    productsPending: 0,
    eventsPending: 0,
    approvedTotal: 0,
    rejectedTotal: 0
  })
  
  // Contagens por categoria para Seção 4
  const [categoryCounts, setCategoryCounts] = useState({
    alimentos: 12,
    artesanato: 8,
    pescados: 6,
    servicos: 5,
    frutas: 4,
    laticinios: 7
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true)
      try {
        const data = await getAdminMetrics()
        setMetrics(data)

        // Tentar calcular dinamicamente as categorias de produtos se supabase existir
        const products = await listAdminProducts()
        if (products.length > 0) {
          const counts = {
            alimentos: products.filter(p => p.categorySlug === 'comida').length,
            artesanato: products.filter(p => p.categorySlug === 'artesanato').length,
            pescados: products.filter(p => p.categorySlug === 'peixe').length,
            servicos: products.filter(p => p.categorySlug === 'servicos').length,
            frutas: 3, // mock/adicional
            laticinios: 4 // mock/adicional
          }
          setCategoryCounts(counts)
        }
      } catch (error) {
        console.error('Erro ao carregar dados do Dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [period])

  // Cálculos para o gráfico analítico SVG circular
  const totalItems = metrics.approvedTotal + (metrics.sellersPending + metrics.productsPending + metrics.eventsPending) + metrics.rejectedTotal
  const approvedPercent = totalItems > 0 ? Math.round((metrics.approvedTotal / totalItems) * 100) : 60
  const pendingPercent = totalItems > 0 ? Math.round(((metrics.sellersPending + metrics.productsPending + metrics.eventsPending) / totalItems) * 100) : 25
  const rejectedPercent = totalItems > 0 ? Math.round((metrics.rejectedTotal / totalItems) * 100) : 15

  // SVG circular segments parameters
  const radius = 50
  const circumference = 2 * Math.PI * radius
  
  const strokeDashApproved = (approvedPercent / 100) * circumference
  const strokeDashPending = (pendingPercent / 100) * circumference
  const strokeDashRejected = (rejectedPercent / 100) * circumference

  const offsetApproved = 0
  const offsetPending = strokeDashApproved
  const offsetRejected = strokeDashApproved + strokeDashPending

  const categoryData = [
    { name: 'Alimentos', count: categoryCounts.alimentos, max: 20, color: 'bg-[#2D5A27]', text: 'text-[#2D5A27]' },
    { name: 'Artesanato', count: categoryCounts.artesanato, max: 20, color: 'bg-[#E8732E]', text: 'text-[#E8732E]' },
    { name: 'Pescados', count: categoryCounts.pescados, max: 20, color: 'bg-[#1E5F8B]', text: 'text-[#1E5F8B]' },
    { name: 'Serviços', count: categoryCounts.servicos, max: 20, color: 'bg-[#7c3aed]', text: 'text-[#7c3aed]' },
    { name: 'Frutas', count: categoryCounts.frutas, max: 20, color: 'bg-[#27AE60]', text: 'text-[#27AE60]' },
    { name: 'Laticínios', count: categoryCounts.laticinios, max: 20, color: 'bg-[#d97706]', text: 'text-[#d97706]' },
  ]

  return (
    <AppShell>
      {/* Header Fixo */}
      <AdminHeader />

      {/* Conteúdo Principal */}
      <main className="flex flex-col gap-7 md:gap-8 px-4 md:px-6 pt-6 md:pt-8 pb-6 md:pb-8 overflow-y-auto font-sans bg-stone-50/50">
        
        {/* Seção 1 — Saudação */}
        <section className="flex items-center justify-between bg-white border border-border/40 p-4 md:p-5 rounded-3xl shadow-xs">
          <div className="flex flex-col gap-1 text-left">
            <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md self-start">
              Painel Administrativo
            </span>
            <h2 className="font-heading font-black text-stone-800 text-lg tracking-wide mt-1">
              Olá, Admin
            </h2>
            <p className="text-stone-500 text-xs font-semibold">
              Gerencie a plataforma com atenção
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-accent/80 flex items-center justify-center text-white shadow-md relative overflow-hidden select-none shrink-0 border border-white/20">
            <span className="font-heading font-extrabold text-base tracking-wider">AD</span>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
        </section>

        {/* Seção 2 — Métricas da Plataforma */}
        <section className="flex flex-col gap-3">
          <h3 className="font-heading font-bold text-stone-800 text-sm uppercase tracking-wider text-left flex items-center gap-1.5">
            <TrendingUp size={16} className="text-primary" />
            Métricas Gerais
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-3">
            {/* Total Vendedores */}
            <div className="bg-white border-l-4 border-l-[#1E5F8B] border border-border/40 rounded-2xl p-4 flex flex-col gap-1 text-left relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between text-[#1E5F8B]">
                <Users size={20} strokeWidth={2.5} />
                <span className="font-heading font-black text-2xl tracking-tight">
                  {isLoading ? '...' : metrics.sellersTotal}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mt-1">
                Vendedores
              </span>
            </div>

            {/* Vendedores Pendentes */}
            <div className="bg-white border-l-4 border-l-[#E8732E] border border-border/40 rounded-2xl p-4 flex flex-col gap-1 text-left relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between text-[#E8732E]">
                <Users size={20} strokeWidth={2.5} className="animate-pulse" />
                <span className="font-heading font-black text-2xl tracking-tight">
                  {isLoading ? '...' : metrics.sellersPending}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mt-1">
                Sellers Pendentes
              </span>
            </div>

            {/* Produtos Pendentes */}
            <div className="bg-white border-l-4 border-l-[#d97706] border border-border/40 rounded-2xl p-4 flex flex-col gap-1 text-left relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between text-[#d97706]">
                <ShoppingBag size={20} strokeWidth={2.5} />
                <span className="font-heading font-black text-2xl tracking-tight">
                  {isLoading ? '...' : metrics.productsPending}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mt-1">
                Prod. Pendentes
              </span>
            </div>

            {/* Eventos Pendentes */}
            <div className="bg-white border-l-4 border-l-[#7c3aed] border border-border/40 rounded-2xl p-4 flex flex-col gap-1 text-left relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between text-[#7c3aed]">
                <Calendar size={20} strokeWidth={2.5} />
                <span className="font-heading font-black text-2xl tracking-tight">
                  {isLoading ? '...' : metrics.eventsPending}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mt-1">
                Feiras Pendentes
              </span>
            </div>
          </div>
        </section>

        {/* Seção 3 — Análise da Plataforma (Gráfico) */}
        <section className="bg-white border border-border/40 p-5 md:p-6 rounded-3xl shadow-xs flex flex-col gap-4 md:gap-5 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-stone-800 text-sm uppercase tracking-wider">
              Análise Geral
            </h3>
            
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodType)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 font-bold text-stone-600 outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="all">Todo período</option>
            </select>
          </div>

          {/* Gráfico de Anéis SVG Customizado */}
          <div className="flex items-center justify-around gap-2 md:gap-6 pt-2">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-stone-100 fill-none"
                  strokeWidth="12"
                />
                
                {/* Approved Arc */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-[#27AE60] fill-none transition-all duration-500"
                  strokeWidth="12"
                  strokeDasharray={`${strokeDashApproved} ${circumference}`}
                  strokeDashoffset={-offsetApproved}
                  strokeLinecap="round"
                />

                {/* Pending Arc */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-[#d97706] fill-none transition-all duration-500"
                  strokeWidth="12"
                  strokeDasharray={`${strokeDashPending} ${circumference}`}
                  strokeDashoffset={-offsetPending}
                  strokeLinecap="round"
                />

                {/* Rejected Arc */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-[#dc2626] fill-none transition-all duration-500"
                  strokeWidth="12"
                  strokeDasharray={`${strokeDashRejected} ${circumference}`}
                  strokeDashoffset={-offsetRejected}
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="absolute flex flex-col items-center">
                <span className="font-heading font-black text-lg text-stone-800 tracking-tighter">
                  {isLoading ? '...' : totalItems}
                </span>
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">
                  Total
                </span>
              </div>
            </div>

            {/* Legendas */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-[#27AE60] shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-700 leading-none">Aprovados</span>
                  <span className="text-[10px] text-stone-400 font-semibold">{approvedPercent}% ({metrics.approvedTotal})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-[#d97706] shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-700 leading-none">Pendentes</span>
                  <span className="text-[10px] text-stone-400 font-semibold">{pendingPercent}% ({metrics.sellersPending + metrics.productsPending + metrics.eventsPending})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-[#dc2626] shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-700 leading-none">Rejeitados</span>
                  <span className="text-[10px] text-stone-400 font-semibold">{rejectedPercent}% ({metrics.rejectedTotal})</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 4 — Produtos por Categoria */}
        <section className="bg-white border border-border/40 p-5 md:p-6 rounded-3xl shadow-xs flex flex-col gap-4 md:gap-5 text-left">
          <h3 className="font-heading font-bold text-stone-800 text-sm uppercase tracking-wider">
            Produtos por Categoria
          </h3>
          
          <div className="flex flex-col gap-4">
            {categoryData.map(cat => {
              const percent = Math.min(Math.round((cat.count / cat.max) * 100), 100)
              return (
                <div key={cat.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                      {cat.name}
                    </span>
                    <span className={cat.text}>{cat.count} ({percent}%)</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${cat.color} transition-all duration-700 ease-out`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Seção 5 — Aprovações Pendentes (Filas de Acesso) */}
        <section className="flex flex-col gap-3">
          <h3 className="font-heading font-bold text-stone-800 text-sm uppercase tracking-wider text-left flex items-center gap-1.5">
            <Award size={16} className="text-primary" />
            Filas de Análise
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-3">
            {/* Vendedores Card */}
            <Link 
              to="/admin/vendedores"
              className="bg-white border border-border/40 rounded-3xl p-4 flex items-center justify-between hover:border-primary/40 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-11 h-11 rounded-2xl bg-[#1E5F8B]/10 text-[#1E5F8B] flex items-center justify-center shrink-0">
                  <Users size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-extrabold text-stone-800 text-sm leading-none">Vendedores</h4>
                    {metrics.sellersPending > 0 && (
                      <span className="bg-[#E8732E] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        {metrics.sellersPending}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-400 text-[11px] font-bold uppercase tracking-wider mt-1 leading-none">
                    Gerenciar cadastros
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-stone-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Produtos Card */}
            <Link 
              to="/admin/produtos"
              className="bg-white border border-border/40 rounded-3xl p-4 flex items-center justify-between hover:border-primary/40 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-11 h-11 rounded-2xl bg-[#E8732E]/10 text-[#E8732E] flex items-center justify-center shrink-0">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-extrabold text-stone-800 text-sm leading-none">Produtos</h4>
                    {metrics.productsPending > 0 && (
                      <span className="bg-[#E8732E] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        {metrics.productsPending}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-400 text-[11px] font-bold uppercase tracking-wider mt-1 leading-none">
                    Validar itens do catálogo
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-stone-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Eventos Card */}
            <Link 
              to="/admin/eventos"
              className="bg-white border border-border/40 rounded-3xl p-4 flex items-center justify-between hover:border-primary/40 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-11 h-11 rounded-2xl bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center shrink-0">
                  <Calendar size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-extrabold text-stone-800 text-sm leading-none">Eventos</h4>
                    {metrics.eventsPending > 0 && (
                      <span className="bg-[#E8732E] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        {metrics.eventsPending}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-400 text-[11px] font-bold uppercase tracking-wider mt-1 leading-none">
                    Revisar feiras e agenda
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-stone-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </section>

      </main>

      {/* Navegação Inferior */}
      <BottomNav />
    </AppShell>
  )
}
