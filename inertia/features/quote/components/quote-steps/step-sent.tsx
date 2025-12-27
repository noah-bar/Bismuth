import { DialogFooter } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon, Loader2 } from 'lucide-react'
import { useI18n } from '~/hooks/use-i18n'
import { useState } from 'react'
import { Quote, QuoteStatus, UpdateQuote } from '~/types/quote'
import { useQuote } from '~/features/quote/hooks/use-quote'
import { FormControl } from '~/components/shared/form-control'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { useForm } from '@inertiajs/react'

type StepSentProps = { quote: Quote }
export function StepSent({ quote }: StepSentProps) {
  const { t } = useI18n()
  const { updateQuote } = useQuote()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<UpdateQuote>({
    status: QuoteStatus.ACCEPTED,
    orderNumber: quote.orderNumber,
  })

  const handlePrevious = () => {
    updateQuote(
      quote.id,
      {
        status: QuoteStatus.DRAFT,
      },
      {
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
      }
    )
  }

  const handleNext = () => {
    form.put(`/quotes/${quote.id}`, {
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    })
  }

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <FormControl error={form.errors.orderNumber}>
          <Label htmlFor={'orderNumber'}>
            {t('components.quote-steps.step-sent.order-number')}
          </Label>
          <Input
            id={'orderNumber'}
            value={form.data.orderNumber}
            onChange={(e) => form.setData('orderNumber', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.order}>
          <Label htmlFor={'order'}>{t('components.quote-steps.step-sent.file')}</Label>
          <Input
            id={'order'}
            type={'file'}
            onChange={(e) => form.setData('order', e.target.files?.[0])}
          />
        </FormControl>
      </div>
      <DialogFooter>
        <div className={'flex w-full justify-between'}>
          <Button variant={'outline'} onClick={handlePrevious}>
            {isLoading ? <Loader2 /> : <ArrowLeftIcon />}
            {t('components.quote-steps.previous-button')}
          </Button>
          <Button onClick={handleNext}>
            {t('components.quote-steps.next-button')}
            {isLoading ? <Loader2 /> : <ArrowRightIcon />}
          </Button>
        </div>
      </DialogFooter>
    </>
  )
}
