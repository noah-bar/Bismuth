import { ReactNode } from 'react'
import { AppLayout } from '~/components/layouts/app-layout'
import { ClosedQuotesChart, MonthlyData, StatCard, YearFilterSelect } from '~/features/statistics'
import { QuoteStatistics } from '~/types/statistics'
import { CheckCheckIcon, CheckIcon, CircleCheckBigIcon, SendIcon } from 'lucide-react'
import { useI18n } from '~/hooks/use-i18n'
import { Box } from '~/components/shared/box'

type IndexProps = {
  quoteStatistics: QuoteStatistics
  availableYears: number[]
  selectedYear: number
  closedQuotesByMonth: MonthlyData[]
}

function Index({ quoteStatistics, closedQuotesByMonth }: IndexProps) {
  const { t } = useI18n()

  return (
    <div className={'h-full flex flex-col gap-2'}>
      <Box className={'flex items-center justify-between'}>
        <h1 className={'text-xl font-semibold'}>{t('pages.statistics.title')}</h1>
        <div>
          <YearFilterSelect />
        </div>
      </Box>
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
      <Box className={'flex flex-col gap-4'}>
        <h3 className={'text-lg font-semibold'}>{t('features.statistics.chart.title')}</h3>
        <ClosedQuotesChart data={closedQuotesByMonth} />
      </Box>
    </div>
  )
}

Index.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Index
