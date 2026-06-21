import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { appRoutes } from '@/app/routes'
import { isSupabaseConfigured } from '@/lib/supabase/client'
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
        setMessage('Cadastro realizado. Confira seu e-mail para confirmar a conta.')
      } else {
        await signIn(email, password)
        setMessage('Login realizado com sucesso.')
        
        const state = location.state as LoginLocationState | null
        const destination = redirectTo ?? state?.from?.pathname ?? appRoutes.home
        navigate(destination, { replace: true })
      }

    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível continuar.')
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
      setMessage('Se este e-mail estiver cadastrado, enviaremos instruções de recuperação.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível recuperar a senha.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleLogin() {
    setMessage(null)
    try {
      await signInWithGoogle()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login com Google indisponível.')
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
    <form aria-label="Login" className="flex flex-col gap-4 md:gap-5 text-left font-sans" onSubmit={handleSubmit}>
      {mode === 'signup' && (
        <label className="flex flex-col gap-1 text-sm font-bold text-stone-750">
          Nome
          <input
            required
            type="text"
            className="rounded-xl border border-stone-200 p-3 md:p-3.5 font-normal text-xs md:text-sm outline-none focus:border-primary transition-colors text-stone-850"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>
      )}

      <label className="flex flex-col gap-1 text-sm font-bold text-stone-750">
        E-mail
        <input
          required
          className="rounded-xl border border-stone-200 p-3 md:p-3.5 font-normal text-xs md:text-sm outline-none focus:border-primary transition-colors text-stone-850"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold text-stone-750">
        Senha
        <input
          required
          className="rounded-xl border border-stone-200 p-3 md:p-3.5 font-normal text-xs md:text-sm outline-none focus:border-primary transition-colors text-stone-850"
          minLength={8}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <button
        className="rounded-xl bg-primary p-3 md:p-3.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 text-xs md:text-sm active:scale-[0.98] transition-all"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
      </button>

      <button
        className="rounded-xl border border-stone-200 p-3 md:p-3.5 font-bold text-xs md:text-sm text-stone-700 hover:bg-stone-50 transition-colors"
        type="button"
        onClick={() => void handleGoogleLogin()}
      >
        Continuar com Google
      </button>

      <button
        className="text-xs font-bold text-primary hover:underline transition-all"
        type="button"
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
      >
        {mode === 'login' ? 'Ainda não tenho conta' : 'Já tenho uma conta'}
      </button>

      {mode === 'login' && (
        <button
          className="text-xs font-bold text-foreground/60 hover:underline transition-all"
          type="button"
          onClick={() => void handlePasswordReset()}
        >
          Esqueci minha senha
        </button>
      )}

      {message && (
        <p aria-live="polite" role="status" className="text-xs text-stone-500 font-semibold leading-relaxed">
          {message}
        </p>
      )}
    </form>
  )
}
