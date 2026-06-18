import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase/client'
import { AuthContext } from './hooks/useAuth'
import type { UserRole } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<UserRole>('visitor')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      return
    }

    const client = supabase
    const loadSession = async (nextSession: Session | null) => {
      setSession(nextSession)

      if (!nextSession) {
        setRole('visitor')
        setIsLoading(false)
        return
      }

      const { data } = await client
        .from('profiles')
        .select('role')
        .eq('user_id', nextSession.user.id)  // corrigido para usar nextSession.user.id
        .single()

      setRole((data?.role as UserRole | undefined) ?? 'seller')
      setIsLoading(false)
    }

    client.auth.getSession().then(({ data }) => void loadSession(data.session))
    const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
      void loadSession(nextSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const value = useMemo(
    () => ({ session, user: session?.user ?? null, role, isLoading }),
    [session, role, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}