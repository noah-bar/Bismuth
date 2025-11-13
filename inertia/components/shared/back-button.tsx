import { Button } from '@/components/ui/button'
import { useConfirm } from '@/hooks/use-confirm'
import { Undo2Icon } from 'lucide-react'

type BackButtonProps = {
  isDirty?: boolean
}
export function BackButton({ isDirty = false }: BackButtonProps) {
  const { confirm } = useConfirm()

  const handleClick = async () => {
    if (!isDirty || (await confirm())) {
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
