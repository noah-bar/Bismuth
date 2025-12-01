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

export function ContactMenubar() {
  const { t } = useI18n()
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{t('features.contact.contact-menubar.file.title')}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={'/contacts/create'}>
              <CirclePlusIcon className={'size-4'} />{' '}
              {t('features.contact.contact-menubar.file.items.new')}
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
