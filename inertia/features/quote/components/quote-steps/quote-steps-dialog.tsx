import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { DialogProps } from '@radix-ui/react-dialog'
import { useI18n } from '~/hooks/use-i18n'
import { Quote } from '~/types/quote'
import { Steps } from '~/features/quote/components/quote-steps/steps'
import { useEffect, useState } from 'react'

type QuoteStepsDialogProps = DialogProps & {
  quote: Quote
}
export function QuoteStepsDialog({
  quote,
  children,
  open,
  onOpenChange,
  ...props
}: QuoteStepsDialogProps) {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(open || false)

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  useEffect(() => {
    if (open !== undefined && open !== isOpen) {
      setIsOpen(open)
    }
  }, [open])

  useEffect(() => {
    if (quote.status === 'closed' && isOpen) {
      handleOpenChange(false)
    }
  }, [quote.status, isOpen])

  return (
    <Dialog {...props} open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t(`components.quote-steps.quote-steps-dialog.title.${quote.status}`)}
          </DialogTitle>
          <DialogDescription>
            {t('components.quote-steps.quote-steps-dialog.description')}
          </DialogDescription>
        </DialogHeader>
        <Steps quote={quote} />
      </DialogContent>
    </Dialog>
  )
}
