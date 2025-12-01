import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { SaveIcon } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'

type SubmitButtonProps = {
  className?: string
  isProcessing?: boolean
  disabled?: boolean
}
export function SubmitButton({ className, isProcessing, disabled }: SubmitButtonProps) {
  const { t } = useI18n()
  const icon = isProcessing ? <Spinner /> : <SaveIcon className={'size-4'} />
  return (
    <Button type={'submit'} className={cn('', className)} disabled={disabled || isProcessing}>
      {t('components.submit-button')} {icon}
    </Button>
  )
}
