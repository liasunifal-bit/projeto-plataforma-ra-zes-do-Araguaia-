import type { AuthUser, UserRole } from '../types'

const AUTH_STORAGE_KEY = 'raizes.auth.user'

function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY)

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as AuthUser
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

function saveUser(user: AuthUser) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

function getNameFromEmail(email: string) {
  return email.split('@')[0] || 'Usuario'
}

export function getCurrentUser(): AuthUser | null {
  return getStoredUser()
}

export async function getCurrentUserRole(): Promise<UserRole> {
  return getStoredUser()?.role ?? 'visitor'
}

export async function signUp(email: string, password: string, fullName: string) {
  if (password.length < 8) {
    throw new Error('A senha precisa ter pelo menos 8 caracteres.')
  }

  const user: AuthUser = {
    id: crypto.randomUUID(),
    email,
    fullName: fullName.trim() || getNameFromEmail(email),
    role: 'seller',
    createdAt: new Date().toISOString(),
  }

  saveUser(user)
  return { user }
}

export async function signIn(email: string, password: string) {
  if (!email.trim() || password.length < 8) {
    throw new Error('Informe e-mail e senha validos.')
  }

  const existingUser = getStoredUser()
  const user: AuthUser = existingUser?.email === email
    ? existingUser
    : {
        id: crypto.randomUUID(),
        email,
        fullName: getNameFromEmail(email),
        role: 'seller',
        createdAt: new Date().toISOString(),
      }

  saveUser(user)
  return { user }
}

export async function signInWithGoogle() {
  throw new Error('Login com Google depende da integracao com o provedor de autenticacao.')
}

export async function signOut() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

export async function requestPasswordReset(email: string) {
  if (!email.trim()) {
    throw new Error('Informe seu e-mail para recuperar a senha.')
  }

  return { email }
}
