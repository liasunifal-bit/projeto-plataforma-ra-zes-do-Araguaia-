import { useState, type FormEvent } from 'react'

import { isSupabaseConfigured } from '@/lib/supabase/client'
import { requestPasswordReset, signIn, signInWithGoogle, signUp } from '../services/authService'

export function LoginForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      if (mode === 'signup') {
        await signUp(email, password, fullName)
        setMessage('Cadastro realizado. Confira seu e-mail para confirmar a conta.')
      } else {
        await signIn(email, password)
        setMessage('Login realizado com sucesso.')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel continuar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePasswordReset() {
    if (!email) {
      setMessage('Informe seu e-mail para recuperar a senha.')
      return
    }

    setIsSubmitting(true)
    setMessage(null)
    try {
      await requestPasswordReset(email)
      setMessage('Enviamos as instrucoes de recuperacao para o seu e-mail.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel recuperar a senha.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <p className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para habilitar contas.
      </p>
    )
  }

  return (
    <form aria-label="Login" onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === 'signup' && (
        <label className="flex flex-col gap-1 text-sm font-bold">
          Nome
          <input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="rounded-xl border p-3 font-normal"
          />
        </label>
      )}
      <label className="flex flex-col gap-1 text-sm font-bold">
        E-mail
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-xl border p-3 font-normal"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-bold">
        Senha
        <input
          required
          minLength={8}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-xl border p-3 font-normal"
        />
      </label>
      <button disabled={isSubmitting} className="rounded-xl bg-primary p-3 font-bold text-white">
        {isSubmitting ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
      </button>
      <button
        type="button"
        onClick={() => void signInWithGoogle()}
        className="rounded-xl border p-3 font-bold"
      >
        Continuar com Google
      </button>
      <button
        type="button"
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="text-sm font-bold text-primary"
      >
        {mode === 'login' ? 'Ainda nao tenho conta' : 'Ja tenho uma conta'}
      </button>
      {mode === 'login' && (
        <button
          type="button"
          onClick={() => void handlePasswordReset()}
          className="text-sm font-bold text-foreground/60"
        >
          Esqueci minha senha
        </button>
      )}
      {message && (
        <p role="status" className="text-sm">
          {message}
        </p>
      )}
    </form>
  )
}
