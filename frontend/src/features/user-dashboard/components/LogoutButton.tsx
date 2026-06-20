import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { appRoutes } from '@/app/routes'
import { signOut } from '@/features/auth'

export function LogoutButton() {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleLogout() {
    setIsLoggingOut(true)
    setErrorMessage(null)

    try {
      await signOut()
      navigate(appRoutes.onboarding, { replace: true })
    } catch {
      setErrorMessage('Nao foi possivel sair agora. Tente novamente.')
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-white px-4 text-sm font-bold text-destructive transition hover:bg-destructive/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoggingOut}
        type="button"
        onClick={() => void handleLogout()}
      >
        <LogOut aria-hidden="true" size={18} />
        {isLoggingOut ? 'Saindo...' : 'Sair da conta'}
      </button>

      {errorMessage && (
        <p aria-live="polite" className="text-sm font-medium text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

