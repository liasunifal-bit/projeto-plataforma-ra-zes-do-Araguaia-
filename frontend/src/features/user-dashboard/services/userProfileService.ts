import { getCurrentUser } from '@/features/auth'
import type { UserDashboardProfile } from '../types'

export async function getCurrentUserProfile(): Promise<UserDashboardProfile> {
  const user = getCurrentUser()

  if (!user) {
    throw new Error('Sessao expirada. Faca login novamente.')
  }

  return {
    createdAt: user.createdAt,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  }
}
