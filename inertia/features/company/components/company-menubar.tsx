import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useI18n } from '@/hooks/use-i18n'
import { Link } from '@inertiajs/react'
import { CirclePlusIcon } from 'lucide-react'

export function CompanyMenubar() {
  const { t } = useI18n()
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{t('features.company.company-menubar.file.title')}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={'/companies/create'}>
              <CirclePlusIcon className={'size-4'} />{' '}
              {t('features.company.company-menubar.file.items.new')}
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
