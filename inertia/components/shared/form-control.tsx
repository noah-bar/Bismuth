import { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

type FormControlProps = HTMLAttributes<HTMLInputElement> & {
  error?: string
}

export function FormControl({ children, className, error, ...props }: FormControlProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {error && <p className={'text-sm text-destructive'}>{error}</p>}
      {children}
    </div>
  )
}
