import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

import type { UserRole } from '../types'

export type AuthContextValue = {
  session: Session | null
  user: User | null
  role: UserRole
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  role: 'visitor',
  isLoading: true,
})

export function useAuth() {
  return useContext(AuthContext)
}
