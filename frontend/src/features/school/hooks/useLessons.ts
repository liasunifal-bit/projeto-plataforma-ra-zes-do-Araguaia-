import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import { listLessons } from '../services/lessonService'
import type { Lesson } from '../types'

export function useLessons(): Lesson[] {
  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    const load = () => void listLessons().then(setLessons)
    load()
    const channel = supabase
      ?.channel('lesson-progress')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lesson_progress' }, load)
      .subscribe()

    return () => {
      if (channel && supabase) void supabase.removeChannel(channel)
    }
  }, [])

  return lessons
}
