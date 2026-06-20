import { CalendarDays, Mail, ShieldCheck, UserRound } from 'lucide-react'

import type { UserRole } from '@/features/auth'
import { formatDate } from '@/shared/utils/formatDate'
import type { UserDashboardProfile } from '../types'

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrador',
  helper: 'Apoiador',
  seller: 'Vendedor',
  visitor: 'Visitante',
}

type UserInfoCardProps = {
  profile: UserDashboardProfile
}

export function UserInfoCard({ profile }: UserInfoCardProps) {
  return (
    <section
      aria-labelledby="user-info-title"
      className="rounded-2xl border border-border/30 bg-white p-5 shadow-sm"
    >
      <header className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UserRound aria-hidden="true" size={22} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Minha conta</p>
          <h2 id="user-info-title" className="font-heading text-xl font-bold text-foreground">
            Bem-vindo(a), {profile.fullName}
          </h2>
        </div>
      </header>

      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-muted/40 p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/45">
            <UserRound aria-hidden="true" size={14} />
            Nome completo
          </dt>
          <dd className="mt-2 text-sm font-bold text-foreground">{profile.fullName}</dd>
        </div>

        <div className="rounded-2xl bg-muted/40 p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/45">
            <Mail aria-hidden="true" size={14} />
            E-mail
          </dt>
          <dd className="mt-2 break-words text-sm font-bold text-foreground">{profile.email}</dd>
        </div>

        <div className="rounded-2xl bg-muted/40 p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/45">
            <ShieldCheck aria-hidden="true" size={14} />
            Perfil
          </dt>
          <dd className="mt-2 text-sm font-bold text-foreground">{roleLabels[profile.role]}</dd>
        </div>

        <div className="rounded-2xl bg-muted/40 p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/45">
            <CalendarDays aria-hidden="true" size={14} />
            Cadastro
          </dt>
          <dd className="mt-2 text-sm font-bold text-foreground">
            {profile.createdAt ? formatDate(profile.createdAt) : 'Data nao informada'}
          </dd>
        </div>
      </dl>
    </section>
  )
}

