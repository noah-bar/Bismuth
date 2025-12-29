import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type StatCardVariant = 'sent' | 'accepted' | 'completed' | 'invoiced'

type StatCardProps = {
  title: string
  count: number
  total?: number
  currency?: string
  icon?: ReactNode
  variant?: StatCardVariant
  className?: string
}

const variantStyles = {
  sent: {
    count: 'text-primary',
    total: 'text-primary',
    border: 'border-l-4 border-l-primary',
    iconBg: 'bg-primary/10',
    icon: 'text-primary',
  },
  accepted: {
    count: 'text-blue-400',
    total: 'text-blue-400',
    border: 'border-l-4 border-l-blue-400',
    iconBg: 'bg-blue-400/10',
    icon: 'text-blue-400',
  },
  completed: {
    count: 'text-green-500',
    total: 'text-green-500',
    border: 'border-l-4 border-l-green-500',
    iconBg: 'bg-green-500/10',
    icon: 'text-green-500',
  },
  invoiced: {
    count: 'text-slate-500',
    total: 'text-slate-500',
    border: 'border-l-4 border-l-slate-500',
    iconBg: 'bg-slate-500/10',
    icon: 'text-slate-500',
  },
}

export function StatCard({
  title,
  count,
  total,
  currency,
  icon,
  variant,
  className,
}: StatCardProps) {
  const styles = variant ? variantStyles[variant] : null

  return (
    <div
      className={cn(
        'bg-background p-6 rounded-lg shadow-sm border border-border flex flex-col gap-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        styles?.border,
        className
      )}
    >
      <div className={'flex items-center justify-between'}>
        <h3 className={'text-sm font-medium text-muted-foreground uppercase'}>{title}</h3>
        {icon && (
          <div
            className={cn(
              'p-2 rounded-md transition-transform duration-200 hover:scale-110',
              styles ? styles.iconBg : 'bg-muted',
              styles ? styles.icon : 'text-muted-foreground'
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <div className={'flex justify-between items-baseline gap-2'}>
        <p className={cn('text-3xl font-bold', styles?.count)}>{count}</p>
        {total !== undefined && (
          <p className={cn('text-2xl font-bold', styles?.total)}>
            {total.toFixed(2)} {currency || 'CHF'}
          </p>
        )}
      </div>
    </div>
  )
}
