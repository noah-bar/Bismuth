import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useI18n } from '@/hooks/use-i18n'
import { Link, usePage } from '@inertiajs/react'
import { CirclePlusIcon, EditIcon } from 'lucide-react'
import { Quote } from '~/types/quote'

export function QuoteMenubar() {
  const { t } = useI18n()
  const { quote } = usePage<{ quote?: Quote }>().props

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
          {quote && (
            <MenubarItem asChild>
              <Link href={`/quotes/${quote.id}/edit`}>
                <EditIcon className={'size-4'} />{' '}
                {t('features.quote.quote-menubar.file.items.edit')}
              </Link>
            </MenubarItem>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
