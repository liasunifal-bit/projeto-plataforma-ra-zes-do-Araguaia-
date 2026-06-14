import { supabase } from '@/lib/supabase/client'
import type { CommunityEvent } from '../types'

export async function listEvents(): Promise<CommunityEvent[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('events')
    .select('id, title, starts_at, location_name')
    .eq('status', 'published')
    .order('starts_at')

  if (error) throw error
  return (data ?? []).map((event) => ({
    id: event.id,
    title: event.title,
    date: event.starts_at,
    location: event.location_name,
  }))
}
