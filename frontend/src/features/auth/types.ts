export type UserRole = 'visitor' | 'seller' | 'helper' | 'admin'

export type AuthUser = {
  id: string
  email: string
  fullName: string
  role: Exclude<UserRole, 'visitor'>
  createdAt: string
}
