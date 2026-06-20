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
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 p-5 text-left font-sans">
        <h1 className="font-heading text-xl font-black text-stone-800">Bem-vindo ao Raízes do Araguaia</h1>
        
        {isLoading ? (
          <p
            aria-live="polite"
            className="rounded-2xl bg-primary/10 p-4 text-xs font-bold text-primary animate-pulse"
          >
            Verificando sessão...
          </p>
        ) : (
          <LoginForm />
        )}
      </main>
    </AppShell>
  )
}
