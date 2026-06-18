import { requireSupabase, supabase } from '@/lib/supabase/client'
import type { Seller } from '../types'

export async function listSellers(): Promise<Seller[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('seller_profiles')
    .select('id, display_name, whatsapp_number, pix_key')
    .eq('is_published', true)
    .order('display_name')

  if (error) throw error
  return (data ?? []).map((seller) => ({
    id: seller.id,
    name: seller.display_name,
    phone: seller.whatsapp_number,
    pixKey: seller.pix_key ?? undefined,
  }))
}

export type SaveSellerInput = {
  displayName: string
  whatsappNumber: string
  locationName: string
  pixKey?: string
}

export async function saveMySellerProfile(input: SaveSellerInput) {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) throw new Error('Entre na sua conta para continuar.')

  // user_id é o nome real da coluna em seller_profiles (ver schema SQL).
  // "owner_id" não existe na tabela e causava erro de coluna inexistente.
  const { data, error } = await client
    .from('seller_profiles')
    .upsert(
      {
        user_id: authData.user.id,
        display_name: input.displayName,
        whatsapp_number: input.whatsappNumber,
        location_name: input.locationName,
        pix_key: input.pixKey || null,
        is_published: true,
      },
      { onConflict: 'user_id' },
    )
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function getMySellerProfile() {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) return null

  const { data, error } = await client
    .from('seller_profiles')
    .select('id, display_name, whatsapp_number, location_name, pix_key')
    .eq('user_id', authData.user.id)
    .maybeSingle()

  if (error) throw error
  return data
}