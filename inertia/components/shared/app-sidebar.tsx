import { AppLogo } from '@/components/shared/app-logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LogoutButton, useAuth } from '@/features/auth'
import { useI18n } from '@/hooks/use-i18n'
import { Link, usePage } from '@inertiajs/react'
import { Building2Icon, ChartPieIcon, FileTextIcon, UserPlusIcon } from 'lucide-react'
import { ProfileButton } from '~/features/profile'

export function AppSidebar() {
  const { user } = useAuth()
  const { t } = useI18n()
  const { url } = usePage()

  return (
    <Sidebar>
      <SidebarHeader className={'h-[50px] border-b border-border'}>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('components.app-sidebar.groups.application')}</SidebarGroupLabel>
          <SidebarGroupContent className={'flex flex-col gap-1'}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={url.includes('/statistics')}>
                <Link href={'/statistics'}>
                  <ChartPieIcon className={'size-4'} />
                  {t('components.app-sidebar.items.statistics')}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={url.includes('/quotes')}>
                <Link href={'/quotes'}>
                  <FileTextIcon className={'size-4'} />
                  {t('components.app-sidebar.items.quotes')}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={url.includes('/companies')}>
                <Link href={'/companies'}>
                  <Building2Icon className={'size-4'} />
                  {t('components.app-sidebar.items.companies')}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={url.includes('/contacts')}>
                <Link href={'/contacts'}>
                  <UserPlusIcon className={'size-4'} />
                  {t('components.app-sidebar.items.contacts')}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={'h-[50px] border-t border-border'}>
        <div className={'flex items-center justify-between'}>
          {user.firstName} {user.lastName}
          <div className={'flex items-center justify-center gap-2'}>
            <ProfileButton />
            <LogoutButton />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
