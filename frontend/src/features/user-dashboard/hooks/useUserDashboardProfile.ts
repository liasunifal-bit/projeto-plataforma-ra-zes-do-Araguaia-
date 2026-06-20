import { useEffect, useState } from 'react'

import { getCurrentUserProfile } from '../services'
import type { UserDashboardProfile } from '../types'

type UserDashboardProfileState = {
  profile: UserDashboardProfile | null
  isLoading: boolean
  errorMessage: string | null
}

export function useUserDashboardProfile(): UserDashboardProfileState {
  const [state, setState] = useState<UserDashboardProfileState>({
    profile: null,
    isLoading: true,
    errorMessage: null,
  })

  useEffect(() => {
    let isActive = true

    getCurrentUserProfile()
      .then((profile) => {
        if (isActive) {
          setState({ profile, isLoading: false, errorMessage: null })
        }
      })
      .catch((error) => {
        if (isActive) {
          setState({
            profile: null,
            isLoading: false,
            errorMessage:
              error instanceof Error
                ? error.message
                : 'Nao foi possivel carregar sua conta agora.',
          })
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return state
}

