import { RootLayout } from '@/components/layouts/root-layout'
import { AppSidebar } from '@/components/shared/app-sidebar'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ReactNode } from 'react'
import { AppVersion } from '~/components/shared/app-version'

export type AppLayoutProps = {
  children?: ReactNode
  header?: ReactNode
}
export function AppLayout({ children, header }: AppLayoutProps) {
  return (
    <RootLayout>
      <SidebarProvider>
        <AppSidebar />
        <div className="grid w-full h-screen grid-rows-[50px_1fr] overflow-hidden">
          <div className={'flex items-center justify-between border-b bg-sidebar px-2'}>
            <div className={'flex items-center gap-2'}>
              <SidebarTrigger />
              {header}
            </div>
            <div className={'flex items-center gap-2'}>
              <AppVersion />
              <ThemeToggle />
            </div>
          </div>
          <main className={'p-2 overflow-auto bg-muted'}>{children}</main>
        </div>
      </SidebarProvider>
    </RootLayout>
  )
}
