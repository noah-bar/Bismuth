import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useI18n } from '@/hooks/use-i18n'
import { router, usePage } from '@inertiajs/react'
import { SearchIcon } from 'lucide-react'
import { ChangeEvent, ComponentProps, useState } from 'react'

export type SearchInputProps = ComponentProps<'input'> & {
  results?: number
}

export function SearchInput({ placeholder, results, ...props }: SearchInputProps) {
  const { t } = useI18n()
  const { q } = usePage<{ q?: string }>().props
  const [search, setSearch] = useState(q || '')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    router.get(
      '',
      {
        q: e.target.value,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  return (
    <InputGroup>
      <InputGroupInput
        placeholder={placeholder || t('components.search-input.placeholder')}
        value={search}
        onChange={handleChange}
        {...props}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      {typeof results !== 'undefined' && search && (
        <InputGroupAddon align="inline-end">
          {results} {t('components.search-input.results')}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
