import { useState, useRef } from 'react'
import { CalendarDays, Mail, ShieldCheck, UserRound, Edit2, Check, X, Camera, Loader2 } from 'lucide-react'
import { requireSupabase } from '@/lib/supabase/client'
import { uploadAvatar } from '@/lib/storage/uploadAvatar'

import type { UserRole } from '@/features/auth'
import { formatDate } from '@/shared/utils/formatDate'
import type { UserDashboardProfile } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [fullName, setFullName] = useState(profile.fullName)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(profile.avatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const client = requireSupabase()
      const { error } = await client.auth.updateUser({
        data: { full_name: fullName, avatar_url: avatarUrl }
      })
      
      if (error) throw error
      
      // Atualizar também o nome do vendedor associado, para refletir nos produtos do catálogo
      const { data: authData } = await client.auth.getUser()
      if (authData.user) {
        await client
          .from('seller_profiles')
          .update({ display_name: fullName })
          .eq('user_id', authData.user.id)
      }

      setIsEditing(false)
      // Recarregar a página para o AuthProvider pegar os novos dados
      window.location.reload()
    } catch (error) {
      console.error('Erro ao atualizar perfil', error)
      alert('Não foi possível salvar o perfil.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFullName(profile.fullName)
    setAvatarUrl(profile.avatarUrl)
    setIsEditing(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsSaving(true)
    try {
      const client = requireSupabase()
      
      // Se já existia um avatar anterior no bucket (não URL do Google), apagá-lo
      if (avatarUrl && !avatarUrl.startsWith('http')) {
        await client.storage.from('avatars').remove([avatarUrl])
      }

      const newAvatarUrl = await uploadAvatar(file)
      setAvatarUrl(newAvatarUrl)
      
      // Auto-salvar quando subir o avatar
      await client.auth.updateUser({
        data: { avatar_url: newAvatarUrl }
      })
    } catch (error) {
      console.error('Erro ao fazer upload do avatar', error)
      alert('Não foi possível enviar a imagem. Verifique se o bucket "avatars" existe no Supabase.')
    } finally {
      setIsSaving(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <section
      aria-labelledby="user-info-title"
      className="rounded-2xl border border-border/30 bg-white p-5 shadow-sm"
    >
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-14 w-14 border border-border cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
              <AvatarImage src={avatarUrl} alt={fullName} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-primary">
                <UserRound aria-hidden="true" size={26} />
              </AvatarFallback>
              
              {/* Overlay de edição de foto */}
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                {isSaving ? <Loader2 className="animate-spin text-white w-5 h-5" /> : <Camera className="text-white w-5 h-5" />}
              </div>
            </Avatar>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              disabled={isSaving}
            />
          </div>
          
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Minha conta</p>
            {isEditing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSaving}
                className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            ) : (
              <h2 id="user-info-title" className="font-heading text-xl font-bold text-foreground">
                Bem-vindo(a), {fullName}
              </h2>
            )}
          </div>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCancel}
                disabled={isSaving}
                className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors flex items-center justify-center"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg"
            >
              <Edit2 size={14} />
              Editar
            </button>
          )}
        </div>
      </header>

      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-muted/40 p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/45">
            <UserRound aria-hidden="true" size={14} />
            Nome completo
          </dt>
          <dd className="mt-2 text-sm font-bold text-foreground">{fullName}</dd>
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
