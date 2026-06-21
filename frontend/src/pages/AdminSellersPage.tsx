import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Phone, ShieldCheck, ChevronRight, UserMinus } from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { listAdminSellers, type AdminSeller } from '@/features/admin/services/adminService'
type TabType = 'all' | 'pending' | 'approved' | 'rejected'


export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<AdminSeller[]>([])
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('pending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSellers() {
      setIsLoading(true)
      try {
        const data = await listAdminSellers()
        setSellers(data)
      } catch (error) {
        console.error('Erro ao buscar lista de vendedores:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSellers()
  }, [])

  // Filtragem e Busca usando useMemo para performance (DRY/Clean Code)
  const filteredSellers = useMemo(() => {
    return sellers.filter(seller => {
      // 1. Filtro de abas
      if (activeTab === 'pending' && seller.isPublished) return false
      if (activeTab === 'approved' && !seller.isPublished) return false
      // Nota: Rejeitados na nossa modelagem sem modificações no schema 
      // podem ser catalogados em logs ou um mock do banco. Para fins de visualização,
      // usaremos uma propriedade ou simulados.
      if (activeTab === 'rejected') return false // Mock: sem rejeitados ativos no banco simples

      // 2. Filtro de Busca
      const searchLower = search.toLowerCase()
      return (
        seller.displayName.toLowerCase().includes(searchLower) ||
        (seller.description && seller.description.toLowerCase().includes(searchLower)) ||
        seller.locationName.toLowerCase().includes(searchLower)
      )
    })
  }, [sellers, search, activeTab])

  return (
    <AppShell>
      <PageHeader title="Análise de Vendedores" />

      {/* Barra de busca e Filtros */}
      <div className="flex flex-col gap-3 px-4 pt-4 pb-2 bg-stone-50/50">
        
        {/* Campo de Busca */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar vendedor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs font-semibold outline-none focus:border-primary bg-white text-stone-800 transition-colors"
          />
        </div>

        {/* Abas */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
          {(['pending', 'approved', 'all'] as const).map((tab) => {
            const label = 
              tab === 'pending' ? 'Pendentes' :
              tab === 'approved' ? 'Aprovados' : 'Todos'
            
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
      <main className="flex-1 flex flex-col gap-4 px-4 pt-3 pb-6 overflow-y-auto md:px-6 lg:px-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-sm text-stone-400 font-bold">
            Carregando vendedores...
          </div>
        ) : filteredSellers.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-stone-200 rounded-3xl bg-white mt-4">
            <UserMinus size={40} className="text-stone-300 mb-2" />
            <h4 className="font-bold text-sm text-stone-600">Nenhum vendedor encontrado</h4>
            <p className="text-xs text-stone-400 mt-1 text-center">Tente mudar os termos da busca ou a aba de status.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {filteredSellers.map((seller) => (
              <Link
                key={seller.id}
                to={`/admin/vendedor/${seller.id}`}
                className="p-4 rounded-3xl border border-border/40 bg-white flex items-center justify-between hover:border-primary/30 hover:shadow-xs transition-all group"
              >
                <div className="flex flex-col gap-1.5 text-left max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-extrabold text-stone-800 text-sm leading-tight">
                      {seller.displayName}
                    </h3>
                    {seller.isPublished ? (
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <ShieldCheck size={10} />
                        Ativo
                      </span>
                    ) : (
                      <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                        Pendente
                      </span>
                    )}
                  </div>
                  
                  {seller.description && (
                    <p className="text-stone-500 text-xs line-clamp-1 leading-relaxed">
                      {seller.description}
                    </p>
                  )}

                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs font-semibold">
                      <MapPin size={13} className="shrink-0" />
                      <span className="truncate">{seller.locationName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs font-semibold">
                      <Phone size={13} className="shrink-0" />
                      <span>{seller.whatsappNumber}</span>
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
