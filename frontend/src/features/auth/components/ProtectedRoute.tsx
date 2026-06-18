import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

import { appRoutes } from '@/app/routes'
import { useAuth } from '../hooks'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <p aria-live="polite" className="text-sm font-bold text-foreground/60">
          Verificando sessao...
        </p>
      </main>
    )
  }

  if (!user) {
    return <Navigate replace to={appRoutes.onboarding} state={{ from: location }} />
  }

  return children
}

