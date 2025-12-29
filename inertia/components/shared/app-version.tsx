import { usePage } from '@inertiajs/react'
import { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type AppVersionProps = HTMLAttributes<HTMLSpanElement>
export function AppVersion({ className, ...props }: AppVersionProps) {
  const { appVersion } = usePage<{ appVersion: string }>().props
  return (
    <span className={cn('text-xs text-muted-foreground', className)} {...props}>
      v{appVersion}
    </span>
  )
}
