/**
 * Header usado exclusivamente na HomePage.
 * Exibe o logo da marca
 * Não possui navegação de volta — é o ponto de entrada da aplicação.
 */

import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User as UserIcon, Package, UserCircle } from 'lucide-react'
import logo from '@/assets/logo.png'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { signOut } from '@/features/auth/services/authService'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  title?: string
}

export function Header({ title = 'Raízes do Araguaia' }: HeaderProps) {
  const { user, session } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  // Obter as iniciais ou usar um placeholder para o avatar
  const fullName = user?.user_metadata?.full_name || user?.email || ''
  const initials = fullName
    ? fullName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U'

  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <header className="bg-primary text-white pt-6 pb-8 px-5 rounded-b-[2.5rem] shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between w-full gap-2">
        {/* Logo and Title */}
        <div className="flex items-center gap-3.5">
          <img
            src={logo}
            alt="Logo Raízes do Araguaia"
            className="w-16 h-16 rounded-full object-contain bg-white p-1 shrink-0"
          />

          <h1
            className="font-heading font-bold italic text-white leading-tight max-w-[150px] sm:max-w-full"
            style={{ fontSize: '1.4rem', letterSpacing: '0.01em' }}
          >
            {title}
          </h1>
        </div>

        {/* User Menu Area */}
        <div className="flex-shrink-0">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus:ring-2 focus:ring-white rounded-full">
                <Avatar className="w-16 h-16 border-2 border-white/20 shadow-md bg-white">
                  {avatarUrl && <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover rounded-full" />}
                  {!avatarUrl && (
                    <AvatarFallback className="bg-primary-foreground text-primary font-semibold text-xl">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 font-sans">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/minha-conta" className="flex items-center w-full">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/meus-produtos" className="flex items-center w-full">
                    <Package className="w-4 h-4 mr-2" />
                    Produtos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair da conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="w-16 h-16 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/boas-vindas" aria-label="Entrar / Login">
                <UserIcon className="w-7 h-7" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[90%]">
        Encontre produtos frescos e artesanato da nossa gente
      </p>
    </header>
  )
}
