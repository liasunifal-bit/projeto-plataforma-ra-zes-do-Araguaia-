import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { appRoutes } from '@/app/routes'
import { requestPasswordReset, signIn, signInWithGoogle, signUp } from '../services/authService'

type LoginFormProps = {
  redirectTo?: string
}

type LoginLocationState = {
  from?: {
    pathname?: string
  }
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
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
      } else {
        await signIn(email, password)
      }

      const state = location.state as LoginLocationState | null
      const destination = redirectTo ?? state?.from?.pathname ?? appRoutes.home
      navigate(destination, { replace: true })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel continuar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePasswordReset() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      await requestPasswordReset(email)
      setMessage('Se este e-mail estiver cadastrado, enviaremos instrucoes de recuperacao.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel recuperar a senha.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleLogin() {
    setMessage(null)

    try {
      await signInWithGoogle()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login com Google indisponivel.')
    }
  }

  return (
    <form aria-label="Login" className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {mode === 'signup' && (
        <label className="flex flex-col gap-1 text-sm font-bold">
          Nome
          <input
            required
            className="rounded-xl border p-3 font-normal"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>
      )}

      <label className="flex flex-col gap-1 text-sm font-bold">
        E-mail
        <input
          required
          className="rounded-xl border p-3 font-normal"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold">
        Senha
        <input
          required
          className="rounded-xl border p-3 font-normal"
          minLength={8}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <button
        className="rounded-xl bg-primary p-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
      </button>

      <button
        className="rounded-xl border p-3 font-bold"
        type="button"
        onClick={() => void handleGoogleLogin()}
      >
        Continuar com Google
      </button>

      <button
        className="text-sm font-bold text-primary"
        type="button"
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
      >
        {mode === 'login' ? 'Ainda nao tenho conta' : 'Ja tenho uma conta'}
      </button>

      {mode === 'login' && (
        <button
          className="text-sm font-bold text-foreground/60"
          type="button"
          onClick={() => void handlePasswordReset()}
        >
          Esqueci minha senha
        </button>
      )}

      {message && (
        <p aria-live="polite" role="status" className="text-sm">
          {message}
        </p>
      )}
    </form>
  )
}
