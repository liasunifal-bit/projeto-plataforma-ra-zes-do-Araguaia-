import type { UserRole } from '../types'

export function useAuth() {
  return {
    role: 'visitor' as UserRole,
  }
}
