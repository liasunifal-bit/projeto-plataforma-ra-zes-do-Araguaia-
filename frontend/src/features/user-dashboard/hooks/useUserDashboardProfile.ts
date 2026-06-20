import { useAuth } from '@/features/auth'
import type { UserDashboardProfile } from '../types'

type UserDashboardProfileState = {
  profile: UserDashboardProfile | null
  isLoading: boolean
  errorMessage: string | null
}

// Em vez de buscar dados do localStorage (sistema fake do dev anterior),
// lemos diretamente do contexto do AuthProvider, que já tem a sessão real
// do Supabase. Isso elimina o service intermediário e a dependência de
// getCurrentUser que não existe mais.
export function useUserDashboardProfile(): UserDashboardProfileState {
  const { user, role, isLoading } = useAuth()

  if (isLoading) {
    return { profile: null, isLoading: true, errorMessage: null }
  }

  if (!user) {
    return {
      profile: null,
      isLoading: false,
      errorMessage: 'Sessao expirada. Faca login novamente.',
    }
  }

  const profile: UserDashboardProfile = {
    // user_metadata.full_name é salvo no signUp via options.data.full_name
    // (ver authService.ts). Se não tiver, usa o email como fallback.
    fullName: (user.user_metadata?.full_name as string | undefined) ?? user.email ?? 'Usuario',
    email: user.email ?? '',
    role,
    // created_at vem do objeto User do Supabase no formato ISO 8601
    createdAt: user.created_at,
  }

  return { profile, isLoading: false, errorMessage: null }
}