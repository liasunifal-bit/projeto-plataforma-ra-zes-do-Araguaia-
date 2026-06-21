import type { UserRole } from '@/features/auth'

export type UserDashboardProfile = {
  fullName: string
  email: string
  role: UserRole
  createdAt?: string
  avatarUrl?: string
}


