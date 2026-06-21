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
        // Sem sessão ativa → visitante, sem permissão nenhuma
        setRole('visitor')
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await client
          .from('profiles')
          .select('role')
          .eq('user_id', nextSession.user.id)
          .single()

        if (error || !data) {
          // Se não conseguiu buscar o profile por qualquer motivo
          // (RLS, profile não existe, erro de rede), assume 'visitor'
          // em vez de 'seller' — mais seguro: melhor negar acesso
          // indevidamente do que conceder acesso indevido.
          console.warn('AuthProvider: nao foi possivel carregar o role do usuario.', error)
          setRole('visitor')
        } else {
          setRole(data.role as UserRole)
        }
      } catch (err) {
        console.warn('AuthProvider: erro inesperado ao carregar role.', err)
        setRole('visitor')
      } finally {
        setIsLoading(false)
      }
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