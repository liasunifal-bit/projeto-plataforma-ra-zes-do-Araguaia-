import { AppShell } from '@/app/layout/AppShell'
import { Header } from '@/app/layout/Headers'
import { LoginForm, signOut, useAuth } from '@/features/auth'

export default function OnboardingPage() {
  const { user } = useAuth()

  return (
    <AppShell>
      <Header title="Minha conta" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 p-5">
        <h1 className="font-heading text-2xl font-bold">Bem-vindo ao Raizes do Araguaia</h1>
        {user ? (
          <section className="flex flex-col gap-4 rounded-2xl bg-primary/10 p-4">
            <p>
              Conta conectada como <strong>{user.email}</strong>.
            </p>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-xl border border-primary p-3 font-bold text-primary"
            >
              Sair da conta
            </button>
          </section>
        ) : (
          <LoginForm />
        )}
      </main>
    </AppShell>
  )
}
