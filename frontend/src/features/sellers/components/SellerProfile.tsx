import type { Seller } from '../types'

type SellerProfileProps = {
  seller: Seller
}

export function SellerProfile({ seller }: SellerProfileProps) {
  return <section>{seller.name}</section>
}
