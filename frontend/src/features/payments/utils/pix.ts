import type { PixPayload } from '../types'

export function createPixPayload(payload: PixPayload): string {
  return payload.key
}
