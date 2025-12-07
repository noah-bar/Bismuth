import { Button } from '@/components/ui/button'
import { useConfirm } from '@/hooks/use-confirm'
import { Undo2Icon } from 'lucide-react'
import { router } from '@inertiajs/react'

type BackButtonProps = {
  isDirty?: boolean
  url?: string
}
export function BackButton({ isDirty = false, url }: BackButtonProps) {
  const { confirm } = useConfirm()

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
      Back
    </Button>
  )
}
