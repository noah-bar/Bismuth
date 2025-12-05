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

export function QuoteMenubar() {
  const { t } = useI18n()
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{t('features.quote.quote-menubar.file.title')}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={'/quotes/create'}>
              <CirclePlusIcon className={'size-4'} />{' '}
              {t('features.quote.quote-menubar.file.items.new')}
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
