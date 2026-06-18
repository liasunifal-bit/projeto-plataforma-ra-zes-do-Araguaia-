import { useEffect, useState } from 'react'

import { getCurrentUser } from '../services'
import type { AuthUser } from '../types'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser())

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  return {
    isLoading: false,
    role: user?.role ?? 'visitor',
    user,
  }
}
