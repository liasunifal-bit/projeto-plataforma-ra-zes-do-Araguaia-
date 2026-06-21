import { supabase } from '@/lib/supabase/client'
import type { UserDashboardProfile } from '../types'

export async function getCurrentUserProfile(): Promise<UserDashboardProfile> {
  if (!supabase) {
    throw new Error('Supabase não está configurado localmente.')
  }

  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) {
    throw new Error('Sessão expirada. Faça login novamente.')
  }

  // Buscar o perfil correspondente na tabela 'profiles' pública do banco
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, role, created_at')
    .eq('user_id', session.user.id)
    .single()

  if (error) {
    console.error('Erro ao buscar perfil administrativo/vendedor no Supabase:', error)
    // Se o perfil do banco ainda não existir, retornamos dados básicos baseados no e-mail
    return {
      fullName: session.user.email?.split('@')[0] || 'Usuário',
      email: session.user.email || '',
      role: 'seller',
      createdAt: session.user.created_at
    }
  }

  return {
    fullName: profile?.full_name || 'Usuário',
    email: session.user.email || '',
    role: profile?.role || 'seller',
    createdAt: profile?.created_at || session.user.created_at
  }
}
