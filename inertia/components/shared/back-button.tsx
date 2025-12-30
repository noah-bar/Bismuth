import { Button } from '@/components/ui/button'
import { useConfirm } from '@/hooks/use-confirm'
import { Undo2Icon } from 'lucide-react'
import { router } from '@inertiajs/react'
import { useI18n } from '~/hooks/use-i18n'

type BackButtonProps = {
  isDirty?: boolean
  url?: string
}
export function BackButton({ isDirty = false, url }: BackButtonProps) {
  const { confirm } = useConfirm()
  const { t } = useI18n()

  const handleClick = async () => {
    if (!isDirty || (await confirm())) {
      if (url) {
        router.visit(url)
        return
      }
      window.history.back()
    }
  }

  return (
    <Button type={'button'} variant="outline" onClick={handleClick}>
      <Undo2Icon className={'size-4'} />
      {t('components.back-button')}
    </Button>
  )
}
