import type { VisitOptions } from '@inertiajs/core'
import { router, usePage } from '@inertiajs/react'
import { User } from '~/types/user'

export function useAuth() {
  const { user } = usePage<{ user: User }>().props
  const isAuthenticated = !!user

  const logout = (options?: VisitOptions) => router.delete('/logout', options)

  return {
    user: user,
    isAuthenticated,
    logout,
  }
}
