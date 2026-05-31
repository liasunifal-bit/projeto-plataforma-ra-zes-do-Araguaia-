import type { Lesson } from '../types'

type LessonCardProps = {
  lesson: Lesson
}

export function LessonCard({ lesson }: LessonCardProps) {
  return <article>{lesson.title}</article>
}
