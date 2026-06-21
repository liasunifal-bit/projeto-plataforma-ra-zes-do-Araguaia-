import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, ShoppingBag, ShieldCheck } from 'lucide-react'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { listAdminProducts, type AdminProduct } from '@/features/admin/services/adminService'

type TabType = 'all' | 'pending' | 'approved' | 'rejected'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('pending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)
      try {
        const data = await listAdminProducts()
        setProducts(data)
      } catch (error) {
        console.error('Erro ao buscar lista de produtos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filtragem e busca usando useMemo
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Filtro por status
      if (activeTab === 'pending' && product.status !== 'draft') return false
      if (activeTab === 'approved' && product.status !== 'published') return false
      if (activeTab === 'rejected' && product.status !== 'archived') return false

      // 2. Filtro de busca
      const searchLower = search.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower)) ||
        product.sellerName.toLowerCase().includes(searchLower) ||
        product.categorySlug.toLowerCase().includes(searchLower)
      )
    })
  }, [products, search, activeTab])

  return (
    <AppShell>
      <PageHeader title="Análise de Produtos" />

      {/* Barra de busca e Filtros */}
      <div className="flex flex-col gap-3 px-4 pt-4 pb-2 bg-stone-50/50">
        
        {/* Campo de Busca */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar produto por nome, vendedor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs font-semibold outline-none focus:border-primary bg-white text-stone-800 transition-colors"
          />
        </div>

        {/* Abas */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
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
      <main className="flex-1 flex flex-col gap-4 px-4 pt-3 pb-6 overflow-y-auto md:px-6 lg:px-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-sm text-stone-400 font-bold">
            Carregando produtos...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-stone-200 rounded-3xl bg-white mt-4">
            <ShoppingBag size={40} className="text-stone-300 mb-2" />
            <h4 className="font-bold text-sm text-stone-600">Nenhum produto encontrado</h4>
            <p className="text-xs text-stone-400 mt-1 text-center">Não existem registros correspondentes a este status.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/admin/produto/${product.id}`}
                className="p-3 rounded-3xl border border-border/40 bg-white flex items-center gap-3 hover:border-primary/30 hover:shadow-xs transition-all group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 shrink-0 overflow-hidden relative border border-stone-200/40">
                  {/* Se houvesse imagem carregada usaríamos img, caso contrário ícone */}
                  <ShoppingBag size={24} className="opacity-40" />
                </div>

                {/* Detalhes do Produto */}
                <div className="flex-1 flex flex-col gap-1 text-left min-w-0">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-primary">
                    {product.categorySlug}
                  </span>
                  
                  <h3 className="font-heading font-extrabold text-stone-800 text-sm leading-tight truncate">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-400 font-semibold truncate">
                    Vendedor: {product.sellerName}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-xs font-black text-stone-800">
                      R$ {product.price.toFixed(2)}
                      {product.unit && <span className="text-[10px] text-stone-400 font-normal"> / {product.unit}</span>}
                    </span>

                    {product.status === 'published' ? (
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <ShieldCheck size={10} />
                        Publicado
                      </span>
                    ) : product.status === 'draft' ? (
                      <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                        Pendente
                      </span>
                    ) : (
                      <span className="bg-red-500/10 text-red-600 border border-red-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                        Rejeitado
                      </span>
                    )}
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
