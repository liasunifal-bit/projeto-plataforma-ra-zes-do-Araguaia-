import type { PixPayload } from '../types'

export function usePixQRCode(payload: PixPayload): string {
  return payload.key
}
