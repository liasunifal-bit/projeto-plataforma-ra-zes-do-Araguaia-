import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Edit2, ShoppingBag, Loader2 } from 'lucide-react'

import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { listMyProducts, deleteProduct } from '@/features/catalog/services'
import type { ProductSummary } from '@/features/catalog'

export default function MyProductsPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<ProductSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setIsLoading(true)
    try {
      const data = await listMyProducts()
      setProducts(data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return

    setDeletingId(id)
    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      alert('Não foi possível excluir o produto.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <AppShell>
      <PageHeader title="Meus Produtos" />
      
      <div className="p-4 bg-stone-50/50">
        <Link 
          to="/cadastrar-produto" 
          className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Cadastrar Novo Produto
        </Link>
      </div>

      <main className="flex-1 flex flex-col gap-4 px-4 pt-2 pb-6 overflow-y-auto">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-sm text-stone-400 font-bold">
            Carregando seus produtos...
          </div>
        ) : products.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-stone-200 rounded-3xl bg-white mt-4">
            <ShoppingBag size={40} className="text-stone-300 mb-2" />
            <h4 className="font-bold text-sm text-stone-600">Você ainda não tem produtos</h4>
            <p className="text-xs text-stone-400 mt-1 text-center">Cadastre seu primeiro produto para começar a vender.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-3xl border border-border/40 bg-white flex items-center gap-3 hover:border-primary/30 hover:shadow-xs transition-all group"
              >
                {/* Thumbnail */}
                <div 
                  className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 shrink-0 overflow-hidden relative border border-stone-200/40 cursor-pointer"
                  onClick={() => navigate(`/produto/${product.id}`)}
                >
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag size={24} className="opacity-40" />
                  )}
                </div>

                {/* Detalhes do Produto */}
                <div 
                  className="flex-1 flex flex-col gap-1 text-left min-w-0 cursor-pointer"
                  onClick={() => navigate(`/produto/${product.id}`)}
                >
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-primary">
                    {product.category}
                  </span>
                  
                  <h3 className="font-heading font-extrabold text-stone-800 text-sm leading-tight truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-stone-800">
                      R$ {product.price.toFixed(2)}
                      {product.unit && <span className="text-[10px] text-stone-400 font-normal"> / {product.unit}</span>}
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                      {product.stockStatus}
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir produto"
                  >
                    {deletingId === product.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                  <button
                    onClick={() => navigate(`/editar-produto/${product.id}`)}
                    className="p-2 text-stone-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Editar produto"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AppShell>
  )
}
