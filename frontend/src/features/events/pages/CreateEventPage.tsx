import { Link, useNavigate } from 'react-router-dom'
import { AppShell } from '@/app/layout/AppShell'
import { PageHeader } from '@/app/layout/PageHeader'
import { BottomNav } from '@/app/layout/BottomNav'
import { useAuth } from '@/features/auth'
import { EventForm } from '../components/EventForm'

export default function CreateEventPage() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/calendario')
  }

  if (isLoading) {
    return (
      <AppShell>
        <PageHeader title="Cadastrar evento" />
        <main className="flex-1 p-5 md:p-8 text-center text-sm md:text-base font-bold text-stone-600">
          Carregando informações da conta...
        </main>
        <BottomNav />
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell>
        <PageHeader title="Cadastrar evento" />
        <main className="flex flex-1 flex-col justify-center gap-4 md:gap-6 p-6 md:p-10 text-center">
          <p className="text-sm font-bold text-stone-600 leading-relaxed">
            Você precisa entrar ou criar uma conta de vendedor para cadastrar eventos comunitários.
          </p>
          <Link
            to="/boas-vindas"
            className="rounded-2xl bg-emerald-600 py-3 text-center text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-95 shadow-sm"
          >
            Acessar minha conta
          </Link>
        </main>
        <BottomNav />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <PageHeader title="Cadastrar evento" />
      <main className="flex-1 overflow-y-auto p-5 md:p-8">
        <div className="mx-auto flex max-w-xl md:max-w-3xl flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-2xl md:text-3xl font-black text-stone-900 leading-tight">
              Divulgar Feira ou Evento
            </h1>
            <p className="text-xs font-semibold text-stone-500 leading-relaxed">
              Publique novos eventos na comunidade para que apareçam simultaneamente na agenda e no mapa.
            </p>
          </div>
          <EventForm onSubmitSuccess={handleSuccess} />
        </div>
      </main>
      <BottomNav />
    </AppShell>
  )
}
