import { NativeSelect, NativeSelectOption } from '~/components/ui/native-select'
import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { cn } from '~/lib/utils'

type PageProps = { availableYears: number[]; selectedYear: number }
type YearFilterSelectProps = {
  className?: string
}

export function YearFilterSelect({ className }: YearFilterSelectProps) {
  const { availableYears, selectedYear } = usePage<PageProps>().props
  const [year, setYear] = useState(selectedYear)

  const handleChange = (year: string) => {
    const yearNumber = parseInt(year, 10)
    setYear(yearNumber)
    router.get(
      '',
      {
        year: yearNumber,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  return (
    <NativeSelect
      className={cn('w-[150px]', className)}
      value={year.toString()}
      onChange={(e) => handleChange(e.target.value)}
    >
      {availableYears.map((y) => (
        <NativeSelectOption key={y} value={y.toString()}>
          {y}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
