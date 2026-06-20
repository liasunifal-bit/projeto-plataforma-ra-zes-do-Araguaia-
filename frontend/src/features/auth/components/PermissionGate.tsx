import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

import { appRoutes } from '@/app/routes'
import { useAuth } from '../hooks'
import type { UserRole } from '../types'

type PermissionGateProps = {
  children: ReactNode
  allowedRoles?: UserRole[]
}

export function PermissionGate({ children, allowedRoles = ['admin'] }: PermissionGateProps) {
  const { role, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <p aria-live="polite" className="text-sm font-bold text-foreground/60">
          Verificando permissoes...
        </p>
      </main>
    )
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate replace to={appRoutes.home} state={{ from: location }} />
  }

  return children
}