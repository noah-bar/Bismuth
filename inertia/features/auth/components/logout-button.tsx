import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth'
import { LogOutIcon } from 'lucide-react'

export function LogoutButton() {
  const { logout } = useAuth()

  return (
    <Button size={'icon'} variant={'ghost'} onClick={() => logout()}>
      <LogOutIcon />
    </Button>
  )
}
