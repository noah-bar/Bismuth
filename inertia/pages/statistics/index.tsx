import { ReactNode } from 'react'
import { AppLayout } from '~/components/layouts/app-layout'
import { StatCard } from '~/features/statistics'
import { QuoteStatistics } from '~/types/statistics'
import { CheckCheckIcon, CheckIcon, CircleCheckBigIcon, SendIcon } from 'lucide-react'
import { useI18n } from '~/hooks/use-i18n'

type IndexProps = {
  quoteStatistics: QuoteStatistics
}

function Index({ quoteStatistics }: IndexProps) {
  const { t } = useI18n()

  return (
    <div className={'p-6'}>
      <h1 className={'text-3xl font-bold mb-6'}>{t('pages.statistics.title')}</h1>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}>
        <StatCard
          title={t('features.statistics.stat-card.sent')}
          count={quoteStatistics.sent.count}
          total={quoteStatistics.sent.total}
          currency={'CHF'}
          variant={'sent'}
          icon={<SendIcon className={'size-5'} />}
        />
        <StatCard
          title={t('features.statistics.stat-card.accepted')}
          count={quoteStatistics.accepted.count}
          total={quoteStatistics.accepted.total}
          currency={'CHF'}
          variant={'accepted'}
          icon={<CheckIcon className={'size-5'} />}
        />
        <StatCard
          title={t('features.statistics.stat-card.completed')}
          count={quoteStatistics.completed.count}
          total={quoteStatistics.completed.total}
          currency={'CHF'}
          variant={'completed'}
          icon={<CheckCheckIcon className={'size-5'} />}
        />
        <StatCard
          title={t('features.statistics.stat-card.invoiced')}
          count={quoteStatistics.invoiced.count}
          total={quoteStatistics.invoiced.total}
          currency={'CHF'}
          variant={'invoiced'}
          icon={<CircleCheckBigIcon className={'size-5'} />}
        />
      </div>
    </div>
  )
}

Index.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Index
