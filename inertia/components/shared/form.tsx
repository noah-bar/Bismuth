import { FormHTMLAttributes, ReactNode } from 'react'
import { cn } from '~/lib/utils'

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  header?: ReactNode
  footer?: ReactNode
}

export function Form({ className, header, footer, children, ...props }: FormProps) {
  return (
    <form className={cn('grid grid-rows-[auto_1fr_auto] gap-4 size-full', className)} {...props}>
      <div className={'p-2'}>{header}</div>
      <div className={'flex flex-col gap-4 px-2 overflow-y-auto'}>{children}</div>
      <div className={'bg-muted p-2 rounded'}>{footer}</div>
    </form>
  )
}
