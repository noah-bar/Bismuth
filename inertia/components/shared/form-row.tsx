import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type FormRowProps = HTMLAttributes<HTMLDivElement>
export function FormRow({ className, children, ...props }: FormRowProps) {
  const gridColumns = Array.isArray(children) ? children.length : 1
  return (
    <div
      className={cn('flex flex-col md:grid gap-2 md:gap-4 lg:gap-6', className)}
      style={{ gridTemplateColumns: `repeat(${gridColumns}, auto)` }}
      {...props}
    >
      {children}
    </div>
  )
}
