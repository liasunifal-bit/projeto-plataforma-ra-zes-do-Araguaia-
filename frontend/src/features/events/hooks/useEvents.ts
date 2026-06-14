import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import { listEvents } from '../services/eventService'
import type { CommunityEvent } from '../types'

export function useEvents(): CommunityEvent[] {
  const [events, setEvents] = useState<CommunityEvent[]>([])

  useEffect(() => {
    const load = () => void listEvents().then(setEvents)
    load()
    const channel = supabase
      ?.channel('events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, load)
      .subscribe()

    return () => {
      if (channel && supabase) void supabase.removeChannel(channel)
    }
  }, [])

  return events
}
