import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BoxProps = HTMLAttributes<HTMLDivElement>

export function Box({ className, children, ...props }: BoxProps) {
  return (
    <div className={cn('bg-background p-2 rounded-lg shadow-sm', className)} {...props}>
      {children}
    </div>
  )
}
