import type { ProductSummary } from '../types'
import { MessageCircle, Mic, Utensils, ShoppingBasket, Fish, Wrench } from 'lucide-react'

type ProductCardProps = {
  product: ProductSummary
}

const fallbackIconMap = {
  comida: Utensils,
  artesanato: ShoppingBasket,
  peixe: Fish,
  servicos: Wrench,
} as const

export function ProductCard({ product }: ProductCardProps) {
  const FallbackIcon = fallbackIconMap[product.category] || Utensils

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const text = encodeURIComponent(`Olá, vi seu produto "${product.name}" na plataforma Raízes do Araguaia e gostaria de saber mais!`)
    window.open(`https://wa.me/${product.whatsappNumber || '5599999999999'}?text=${text}`, '_blank')
  }

  return (
    <article className="group bg-white rounded-2xl border border-border/30 overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex flex-col select-none relative h-full">
      {/* Container de Imagem */}
      <div className="relative w-full aspect-square bg-muted shrink-0 overflow-hidden border-b border-border/10">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex flex-col items-center justify-center text-primary/70 p-4 text-center">
            <FallbackIcon size={32} className="mb-2 stroke-[1.5]" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {product.category}
            </span>
          </div>
        )}

        {/* Emblema de Áudio */}
        {product.hasAudio && product.audioDuration && (
          <div className="absolute top-2.5 left-2.5 bg-primary/95 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-xs">
            <Mic size={10} className="text-white shrink-0" strokeWidth={3} />
            <span>{product.audioDuration}</span>
          </div>
        )}

        {/* Botão de WhatsApp */}
        <button
          onClick={handleWhatsappClick}
          aria-label="Contatar vendedor no WhatsApp"
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-90 transition-all duration-200 z-10 cursor-pointer"
        >
          <MessageCircle size={18} fill="currentColor" className="text-white" />
        </button>
      </div>

      {/* Detalhes do Produto */}
      <div className="p-3.5 flex flex-col flex-grow text-left">
        {/* Vendedor e Local */}
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">
          {product.sellerName} • {product.location}
        </span>

        {/* Nome do Produto */}
        <h3 className="font-heading font-bold text-sm text-foreground leading-tight tracking-normal mb-2 flex-grow line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Preço */}
        <div className="mt-auto pt-1 flex items-baseline gap-0.5 text-accent font-bold text-base leading-none">
          <span className="text-xs font-semibold mr-0.5">R$</span>
          <span>{product.price.toFixed(2).replace('.', ',')}</span>
          <span className="text-[10px] text-foreground/45 font-medium">
            /{product.unit || 'un'}
          </span>
        </div>
      </div>
    </article>
  )
}
