import type { Seller } from '../types'

export function useSellerProfile(sellers: Seller[], sellerId: string): Seller | undefined {
  return sellers.find((seller) => seller.id === sellerId)
}
