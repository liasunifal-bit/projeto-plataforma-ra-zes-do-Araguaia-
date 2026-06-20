import { ArrowLeft, MessageCircle, Store } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { ProductSummary } from '../types'

type ProductDetailProps = {
  product: ProductSummary
}

const stockStatusLabel: Record<NonNullable<ProductSummary['stockStatus']>, string> = {
  available: 'Disponivel',
  limited: 'Poucas unidades',
  unavailable: 'Indisponivel',
}

export function ProductDetail({ product }: ProductDetailProps) {
  const whatsappMessage = encodeURIComponent(
    `Ola, vi seu produto "${product.name}" na plataforma Raizes do Araguaia e gostaria de saber mais!`,
  )

  return (
    <article className="grid overflow-hidden rounded-2xl border border-border/30 bg-white shadow-sm lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <figure className="bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
            className="aspect-square w-full bg-muted object-cover lg:h-full lg:min-h-[32rem]"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-primary/10 text-sm font-bold uppercase tracking-wide text-primary lg:h-full lg:min-h-[32rem]">
            {product.category}
          </div>
        )}
      </figure>

      <section className="flex flex-col gap-5 p-5 md:p-7 lg:p-8">
        <header className="flex flex-col gap-3">
          <Link
            to="/catalogo"
            className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary"
          >
            <ArrowLeft size={14} />
            Voltar ao catalogo
          </Link>

          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {product.category}
            </span>
            <h1 className="font-heading text-2xl font-bold leading-tight text-foreground">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-accent">
              R$ {product.price.toFixed(2).replace('.', ',')}
              <span className="ml-1 text-xs font-medium text-foreground/45">
                /{product.unit || 'un'}
              </span>
            </p>
          </div>
        </header>

        <section aria-labelledby="product-description-title" className="flex flex-col gap-2">
          <h2 id="product-description-title" className="text-base font-bold text-foreground">
            Detalhes
          </h2>
          <p className="text-sm font-medium leading-relaxed text-foreground/65">
            {product.description || 'Produto local cadastrado no catalogo comunitario.'}
          </p>
        </section>

        <footer className="flex flex-col gap-4 border-t border-border/30 pt-4">
          <div className="flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
            <Store size={18} className="mt-0.5 shrink-0 text-primary" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wide text-foreground/45">
                Vendedor
              </span>
              <strong className="text-sm text-foreground">{product.sellerName}</strong>
              <span className="text-xs font-medium text-foreground/60">{product.location}</span>
              {product.stockStatus && (
                <span className="text-xs font-bold text-accent">
                  {stockStatusLabel[product.stockStatus]}
                </span>
              )}
            </div>
          </div>

          <a
            href={`https://wa.me/${product.whatsappNumber || '5599999999999'}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-whatsapp px-4 text-sm font-bold text-white shadow-sm transition hover:scale-[1.01] active:scale-[0.99]"
          >
            <MessageCircle size={18} fill="currentColor" />
            Falar com vendedor
          </a>
        </footer>
      </section>
    </article>
  )
}
