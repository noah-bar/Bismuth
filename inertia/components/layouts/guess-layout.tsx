import { ReactNode } from 'react'
import { RootLayout } from '~/components/layouts/root-layout'
import { SafeArea } from '~/components/ui/safe-area'
import { ThemeToggle } from '~/components/shared/theme-toggle'
import { AppVersion } from '~/components/shared/app-version'
import { AppLogo } from '~/components/shared/app-logo'

export type GuessLayoutProps = {
  children?: ReactNode
}
export function GuessLayout({ children }: GuessLayoutProps) {
  return (
    <RootLayout>
      <SafeArea className={'flex flex-col h-screen w-full bg-background'}>
        <header className={'w-full h-14 bg-background border-border border-b px-4'}>
          <div className={'flex justify-between h-full container mx-auto'}>
            <AppLogo className={'w-auto'} />
            <div className={'flex items-center gap-2'}>
              <AppVersion />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className={'flex-1 bg-bismuth'}>{children}</main>
      </SafeArea>
    </RootLayout>
  )
}
