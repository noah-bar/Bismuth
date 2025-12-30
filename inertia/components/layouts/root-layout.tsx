import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConfirmProvider } from '@/hooks/use-confirm'
import { ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import { Toaster } from '~/components/ui/sonner'

export type RootLayoutProps = {
  children?: ReactNode
}
export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>Bismuth</title>
      </Head>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <ConfirmProvider>
          <Toaster />
          {children}
        </ConfirmProvider>
      </ThemeProvider>
    </>
  )
}
