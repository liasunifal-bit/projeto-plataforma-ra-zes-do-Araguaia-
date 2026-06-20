import { Navigate } from 'react-router-dom'

import { appRoutes } from '@/app/routes'
import { AppShell } from '@/app/layout/AppShell'
import { Header } from '@/app/layout/Headers'
import { LoginForm, useAuth } from '@/features/auth'

export default function OnboardingPage() {
  const { isLoading, user } = useAuth()

  if (!isLoading && user) {
    return <Navigate replace to={appRoutes.userDashboard} />
  }

  return (
    <AppShell>
      <Header title="Minha conta" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-5 py-8 text-left font-sans md:max-w-lg md:justify-center">
        <h1 className="font-heading text-xl font-black text-stone-800 md:text-2xl">
          Bem-vindo ao Raizes do Araguaia
        </h1>

        {isLoading ? (
          <p
            aria-live="polite"
            className="animate-pulse rounded-2xl bg-primary/10 p-4 text-xs font-bold text-primary"
          >
            Verificando sessao...
          </p>
        ) : (
          <LoginForm />
        )}
      </main>
    </AppShell>
  )
}
