import { Button } from '~/components/ui/button'
import { Link } from '@inertiajs/react'
import { UserRoundIcon } from 'lucide-react'
import { useAuth } from '~/features/auth'

export function ProfileButton() {
  const { user } = useAuth()
  return (
    <Button size={'icon'} variant={'ghost'} asChild>
      <Link href={`/profiles/${user.id}/edit`}>
        <UserRoundIcon/>
      </Link>
    </Button>
  )
}
