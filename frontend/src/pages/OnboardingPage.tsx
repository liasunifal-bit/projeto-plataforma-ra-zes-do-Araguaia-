import { Navigate } from 'react-router-dom'

import { appRoutes } from '@/app/routes'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { LoginForm, useAuth } from '@/features/auth'

export default function OnboardingPage() {
  const { isLoading, user } = useAuth()

  // Se o usuário já está logado, redireciona direto pro dashboard.
  // Replace: true evita que /boas-vindas fique no histórico de navegação
  // — o botão "voltar" do celular não vai trazer o usuário pra tela de login.
  if (!isLoading && user) {
    return <Navigate replace to={appRoutes.home} />
  }

  return (
    <AppShell>
      <PageHeader title="Minha conta" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 p-5 md:max-w-3xl md:p-6 lg:max-w-screen-xl lg:p-8 2xl:max-w-screen-2xl">
        <h1 className="font-heading text-2xl font-bold">Bem-vindo ao Raizes do Araguaia</h1>
        {isLoading ? (
          <p
            aria-live="polite"
            className="rounded-2xl bg-primary/10 p-4 text-sm font-bold text-primary"
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