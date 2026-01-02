import { ReactNode } from 'react'
import { RootLayout } from '~/components/layouts/root-layout'
import { SafeArea } from '~/components/ui/safe-area'

export type GuessLayoutProps = {
  children?: ReactNode
}
export function GuessLayout({ children }: GuessLayoutProps) {
  return (
    <RootLayout>
      <SafeArea className={'h-screen w-full bg-background'}>{children}</SafeArea>
    </RootLayout>
  )
}
