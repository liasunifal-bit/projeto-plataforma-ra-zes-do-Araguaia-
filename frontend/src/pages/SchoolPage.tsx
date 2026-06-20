import { useState } from 'react'

import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { Header } from '@/app/layout/Headers'
import { saveLessonProgress, useLessonProgress, useLessons } from '@/features/school'

export default function SchoolPage() {
  const lessons = useLessons()
  const progress = useLessonProgress(lessons)
  const [message, setMessage] = useState<string | null>(null)

  async function completeLesson(lessonId: string) {
    try {
      await saveLessonProgress(lessonId, 100)
      setMessage('Progresso salvo.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel salvar o progresso.')
    }
  }

  return (
    <AppShell>
      <Header title="Escolinha" />
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 md:p-6 lg:p-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <h1 className="font-heading text-2xl font-bold">Licoes</h1>
        <p>Progresso: {progress}%</p>
        <progress value={progress} max={100} className="w-full" />
        {lessons.length === 0 && <p>Nenhuma licao publicada no momento.</p>}
        {lessons.map((lesson) => (
          <article key={lesson.id} className="flex items-center justify-between gap-3 rounded-2xl border bg-white p-4">
            <h2 className="font-bold">{lesson.title}</h2>
            <button
              disabled={lesson.completed}
              onClick={() => void completeLesson(lesson.id)}
              className="rounded-xl bg-primary px-3 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
              {lesson.completed ? 'Concluida' : 'Concluir'}
            </button>
          </article>
        ))}
        {message && <p role="status">{message}</p>}
      </main>
      <BottomNav />
    </AppShell>
  )
}
