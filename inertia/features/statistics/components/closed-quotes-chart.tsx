import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart'
import { useI18n } from '~/hooks/use-i18n'

export type MonthlyData = {
  month: number
  count: number
  total: number
}

type ClosedQuotesChartProps = {
  data: MonthlyData[]
}

export function ClosedQuotesChart({ data }: ClosedQuotesChartProps) {
  const { t } = useI18n()

  const chartConfig = {
    count: {
      label: t('features.statistics.chart.label'),
      color: 'hsl(var(--chart-1))',
    },
  }

  const monthNames = [
    t('features.statistics.months.jan'),
    t('features.statistics.months.feb'),
    t('features.statistics.months.mar'),
    t('features.statistics.months.apr'),
    t('features.statistics.months.may'),
    t('features.statistics.months.jun'),
    t('features.statistics.months.jul'),
    t('features.statistics.months.aug'),
    t('features.statistics.months.sep'),
    t('features.statistics.months.oct'),
    t('features.statistics.months.nov'),
    t('features.statistics.months.dec'),
  ]

  const chartData = data.map((item) => ({
    month: monthNames[item.month - 1],
    count: item.count,
    total: item.total,
  }))

  const formatCurrency = (value: number) => {
    return `${value.toFixed(0)} CHF`
  }

  return (
    <ChartContainer config={chartConfig} className={'h-[350px] w-full'}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray={'3 3'} vertical={false} />
        <XAxis dataKey={'month'} tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <Bar dataKey={'count'} fill={'var(--primary)'} radius={[8, 8, 0, 0]}>
          <LabelList dataKey={'total'} position={'top'} className={'fill-foreground text-xs'} formatter={formatCurrency} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
