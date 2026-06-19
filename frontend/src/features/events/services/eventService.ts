import { requireSupabase, supabase } from '@/lib/supabase/client'
import type { CommunityEvent } from '../types'

export async function listEvents(): Promise<CommunityEvent[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('events')
    .select('id, title, starts_at, ends_at, location_name, description, latitude, longitude')
    .eq('status', 'published')
    .order('starts_at')

  if (error) throw error
  return (data ?? []).map((event) => ({
    id: event.id,
    title: event.title,
    date: event.starts_at,
    endsAt: event.ends_at ?? undefined,
    location: event.location_name,
    description: event.description ?? undefined,
    latitude: event.latitude ?? undefined,
    longitude: event.longitude ?? undefined,
  }))
}

export type CreateEventInput = {
  title: string
  description: string
  startsAt: string
  endsAt?: string
  locationName: string
  latitude: number
  longitude: number
  status?: 'draft' | 'published' | 'archived'
}

export async function createEvent(input: CreateEventInput): Promise<void> {
  const client = requireSupabase()
  const { data: authData, error: authError } = await client.auth.getUser()
  if (authError || !authData?.user) {
    throw new Error('Você deve estar autenticado para criar um evento.')
  }

  const { error } = await client.from('events').insert({
    user_id: authData.user.id,
    title: input.title,
    description: input.description,
    starts_at: input.startsAt,
    ends_at: input.endsAt || null,
    location_name: input.locationName,
    latitude: input.latitude,
    longitude: input.longitude,
    status: input.status || 'draft',
  })

  if (error) throw error
}
