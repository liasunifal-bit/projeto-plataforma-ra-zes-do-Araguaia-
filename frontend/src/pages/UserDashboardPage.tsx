import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { Header } from '@/app/layout/Headers'
import {
  DashboardActions,
  LogoutButton,
  UserInfoCard,
  useUserDashboardProfile,
} from '@/features/user-dashboard'

export default function UserDashboardPage() {
  const { errorMessage, isLoading, profile } = useUserDashboardProfile()

  return (
    <AppShell>
      <Header title="Minha conta" />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 overflow-y-auto px-4 pb-8 pt-6 md:px-8 lg:px-10 lg:pb-10">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Area do usuario
          </p>
          <h1 className="font-heading text-2xl font-bold leading-tight text-foreground">
            Painel da conta
          </h1>
          <p className="text-sm font-medium leading-relaxed text-foreground/60">
            Acompanhe seus dados publicos e acesse as principais areas do marketplace.
          </p>
        </header>

        {isLoading && (
          <section
            aria-busy="true"
            aria-live="polite"
            className="rounded-2xl bg-white p-5 text-center text-sm font-bold text-foreground/60"
          >
            Carregando dados da conta...
          </section>
        )}

        {!isLoading && errorMessage && (
          <section
            aria-live="polite"
            className="rounded-2xl border border-destructive/20 bg-destructive/10 p-5 text-sm font-bold text-destructive"
          >
            {errorMessage}
          </section>
        )}

        {!isLoading && profile && (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.55fr)] xl:items-start">
            <UserInfoCard profile={profile} />
            <div className="flex flex-col gap-5">
              <DashboardActions />
              <section aria-label="Sair da conta" className="rounded-2xl bg-muted/40 p-4">
                <LogoutButton />
              </section>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </AppShell>
  )
}

