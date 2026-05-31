import type { CommunityEvent } from '../types'

type EventCardProps = {
  event: CommunityEvent
}

export function EventCard({ event }: EventCardProps) {
  return <article>{event.title}</article>
}
