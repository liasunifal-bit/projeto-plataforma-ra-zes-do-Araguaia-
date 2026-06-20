import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { PageHeader } from '@/app/layout/PageHeader'
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
      <PageHeader title="Minha conta" />

      <main className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-24 pt-6 md:px-6 lg:px-8 lg:pb-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
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
          <>
            <UserInfoCard profile={profile} />
            <DashboardActions />
            <section aria-label="Sair da conta" className="rounded-2xl bg-muted/40 p-4">
              <LogoutButton />
            </section>
          </>
        )}
      </main>

      <BottomNav />
    </AppShell>
  )
}