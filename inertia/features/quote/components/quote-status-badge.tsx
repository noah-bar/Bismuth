import { QuoteStatus } from '~/types/quote'
import { Badge } from '~/components/ui/badge'
import { useI18n } from '~/hooks/use-i18n'
import {
  CheckCheckIcon,
  CheckIcon,
  CircleCheckBigIcon,
  CircleXIcon,
  PencilIcon,
  SendIcon,
} from 'lucide-react'

type QuoteStatusBadgeProps = {
  status: QuoteStatus
}
export function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  const { t } = useI18n()
  const text = t(`features.quote.status.${status}`)
  console.log(status)
  switch (status) {
    case QuoteStatus.DRAFT:
      return (
        <Badge variant={'outline'} className={'flex gap-2'}>
          <PencilIcon className={'size-3'} /> {text}
        </Badge>
      )
    case QuoteStatus.SENT:
      return (
        <Badge variant={'default'} className={'flex gap-2'}>
          <SendIcon className={'size-3'} /> {text}
        </Badge>
      )
    case QuoteStatus.REJECTED:
      return (
        <Badge variant={'destructive'} className={'flex gap-2'}>
          <CircleXIcon className={'size-3'} />
          {text}
        </Badge>
      )
    case QuoteStatus.ACCEPTED:
      return (
        <Badge variant={'secondary'} className={'flex gap-2 bg-blue-400 text-white'}>
          <CheckIcon className={'size-3'} />
          {text}
        </Badge>
      )
    case QuoteStatus.COMPLETED:
      return (
        <Badge variant={'secondary'} className={'flex gap-2 bg-green-500 text-white'}>
          <CheckCheckIcon className={'size-3'} />
          {text}
        </Badge>
      )
    case QuoteStatus.CLOSED:
      return (
        <Badge variant={'secondary'} className={'flex gap-2'}>
          <CircleCheckBigIcon className={'size-3'} />
          {text}
        </Badge>
      )
  }

  return <Badge></Badge>
}
