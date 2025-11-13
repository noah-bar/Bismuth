import { DataTableHead } from '@/components/ui/data-table'
import { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react'
import { router, usePage } from '@inertiajs/react'

type SortableDataTableHeadProps = ComponentProps<'th'> & {
  sortKey: string
}

export function SortableDataTableHead({ sortKey, children, ...props }: SortableDataTableHeadProps) {
  const { sort, direction } = usePage<{ sort?: string; direction?: 'asc' | 'desc' }>().props

  const isActive = sort === sortKey
  const variant = isActive ? 'outline' : 'ghost'

  const getArrowIcon = () => {
    if (sort !== sortKey) return <ArrowUpDownIcon className={'size-4'} />

    switch (direction) {
      case 'asc':
        return <ArrowUpIcon className={'size-4'} />
      case 'desc':
        return <ArrowDownIcon className={'size-4'} />
      default:
        return <ArrowUpDownIcon className={'size-4'} />
    }
  }

  const getDirection = () => {
    if (sort !== sortKey) {
      return 'asc'
    }

    if (direction === 'asc') {
      return 'desc'
    }

    if (direction === 'desc') {
      return null
    }

    return 'asc'
  }

  const handleClick = () => {
    const direction = getDirection()
    const qs = direction
      ? { sort: sortKey, direction: direction }
      : { sort: undefined, direction: undefined }

    router.get('', qs, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <DataTableHead className={'text-center'} {...props}>
      <Button onClick={handleClick} variant={variant} className={'inline-flex hover:bg-background'}>
        {children}
        {getArrowIcon()}
      </Button>
    </DataTableHead>
  )
}
