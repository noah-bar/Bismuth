import { ReactNode } from 'react'
import { RootLayout } from '~/components/layouts/root-layout'

export type GuessLayoutProps = {
  children?: ReactNode
}
export function GuessLayout({ children }: GuessLayoutProps) {
  return (
    <RootLayout>
      <div className={'h-screen w-full bg-background p-4'}>{children}</div>
    </RootLayout>
  )
}
