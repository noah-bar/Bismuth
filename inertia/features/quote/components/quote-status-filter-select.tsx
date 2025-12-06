import { NativeSelect, NativeSelectOption } from '~/components/ui/native-select'
import { QuoteStatus } from '~/types/quote'
import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { useI18n } from '~/hooks/use-i18n'

type PageProps = { statuses: QuoteStatus[]; status?: string }
type QuoteStatusFilterSelectProps = {
  className?: string
}
export function QuoteStatusFilterSelect({ className }: QuoteStatusFilterSelectProps) {
  const { t } = useI18n()
  const { statuses, status: qStatus } = usePage<PageProps>().props
  const [status, setStatus] = useState(qStatus || '')

  const handleChange = (status: string) => {
    setStatus(status)
    router.get(
      '',
      {
        status: status ? status : undefined,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  return (
    <NativeSelect
      className={cn('w-[175px]', className)}
      value={status}
      onChange={(e) => handleChange(e.target.value)}
    >
      <NativeSelectOption value={''}>
        {t('features.quote.quote-status-filter-select.placeholder')}
      </NativeSelectOption>
      {statuses.map((status: QuoteStatus) => (
        <NativeSelectOption key={status} value={status}>
          {t(`features.quote.status.${status}`)}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
