import type { Seller } from '../types'

type SellerCardProps = {
  seller: Seller
}

export function SellerCard({ seller }: SellerCardProps) {
  return <article>{seller.name}</article>
}
