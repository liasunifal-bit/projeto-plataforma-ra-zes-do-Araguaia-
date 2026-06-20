import { requireSupabase } from '@/lib/supabase/client'

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await requireSupabase().auth.signUp({
    email,
    password,
    // full_name é salvo nos metadados do usuário no Supabase Auth.
    // O AuthProvider lê esses metadados quando a sessão é carregada.
    options: { data: { full_name: fullName } },
  })
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signInWithGoogle() {
  const { data, error } = await requireSupabase().auth.signInWithOAuth({
    provider: 'google',
    // Após autenticar com Google, o usuário é redirecionado de volta pra
    // /boas-vindas, onde o AuthProvider já vai detectar a sessão ativa.
    options: { redirectTo: `${window.location.origin}/boas-vindas` },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await requireSupabase().auth.signOut()
  if (error) throw error
}

export async function requestPasswordReset(email: string) {
  const { error } = await requireSupabase().auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/boas-vindas`,
  })
  if (error) throw error
}