import { requireSupabase, supabase } from '@/lib/supabase/client'
import type { Lesson } from '../types'

export async function listLessons(): Promise<Lesson[]> {
  if (!supabase) return []

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('status', 'published')
    .order('display_order')
  if (error) throw error

  const { data: authData } = await supabase.auth.getUser()
  if (!authData.user) return lessons ?? []

  const { data: progress, error: progressError } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('user_id', authData.user.id)
  if (progressError) throw progressError

  const completedIds = new Set(
    (progress ?? []).filter((item) => item.completed).map((item) => item.lesson_id),
  )
  return (lessons ?? []).map((lesson) => ({
    ...lesson,
    completed: completedIds.has(lesson.id),
  }))
}

export async function saveLessonProgress(lessonId: string, progressPercent: number) {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) throw new Error('Entre na sua conta para salvar o progresso.')

  const completed = progressPercent >= 100
  const { error } = await client.from('lesson_progress').upsert(
    {
      user_id: authData.user.id,
      lesson_id: lessonId,
      progress_percent: progressPercent,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    },
    { onConflict: 'user_id,lesson_id' },
  )
  if (error) throw error
}
