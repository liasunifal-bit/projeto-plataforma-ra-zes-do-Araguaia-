import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

import type { UserRole } from '../types'

export type AuthContextValue = {
  session: Session | null
  user: User | null
  role: UserRole
  isLoading: boolean
}

// Valor padrão do contexto — usado apenas antes do AuthProvider inicializar.
// isLoading: true garante que a UI não renderiza nada antes de saber se
// há sessão ativa, evitando flashes de conteúdo incorreto (ex: mostrar
// "faça login" por um frame antes de descobrir que o usuário já está logado).
export const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  role: 'visitor',
  isLoading: true,
})

export function useAuth() {
  return useContext(AuthContext)
}