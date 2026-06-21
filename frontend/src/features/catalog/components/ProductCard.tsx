import { Fish, MessageCircle, Mic, ShoppingBasket, Utensils, Wrench } from 'lucide-react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import type { ProductSummary } from '../types'

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

  const handleWhatsappClick = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const text = encodeURIComponent(
      `Ola, vi seu produto "${product.name}" na plataforma Raizes do Araguaia e gostaria de saber mais!`,
    )

    window.open(`https://wa.me/${product.whatsappNumber || '5599999999999'}?text=${text}`, '_blank')
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/30 bg-white shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-[0.99]">
      <Link
        aria-label={`Ver detalhes de ${product.name}`}
        className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        to={`/produto/${product.id}`}
      >
        <div className="relative aspect-square w-full shrink-0 overflow-hidden border-b border-border/10 bg-muted">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.imageAlt || product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-primary/10 p-4 text-center text-primary/70">
              <FallbackIcon size={32} className="mb-2 stroke-[1.5]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {product.category}
              </span>
            </div>
          )}

          {product.hasAudio && product.audioDuration && (
            <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-primary/95 px-2 py-1 text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-xs">
              <Mic size={10} className="shrink-0 text-white" strokeWidth={3} />
              <span>{product.audioDuration}</span>
            </div>
          )}

          <button
            aria-label={`Contatar vendedor de ${product.name} no WhatsApp`}
            className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] transition-all duration-200 hover:scale-110 active:scale-90"
            type="button"
            onClick={handleWhatsappClick}
          >
            <MessageCircle size={18} fill="currentColor" className="text-white" />
          </button>
        </div>

        <div className="flex flex-grow flex-col p-3.5 md:p-4 text-left">
          <span className="mb-1 text-[9px] font-bold uppercase leading-none tracking-widest text-muted-foreground">
            {product.sellerName} - {product.location}
          </span>

          <h3 className="mb-2 line-clamp-2 flex-grow font-heading text-sm md:text-base font-bold leading-tight tracking-normal text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          <footer className="mt-auto flex items-baseline gap-0.5 pt-1 text-base font-bold leading-none text-accent">
            <span className="mr-0.5 text-xs font-semibold">R$</span>
            <span>{product.price.toFixed(2).replace('.', ',')}</span>
            <span className="text-[10px] font-medium text-foreground/45">
              /{product.unit || 'un'}
            </span>
          </footer>
        </div>
      </Link>
    </article>
  )
}
