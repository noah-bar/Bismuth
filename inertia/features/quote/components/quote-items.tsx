import { QuoteItem as TQuoteItem } from '~/types/quote'
import { FormRow } from '~/components/shared/form-row'
import { FormControl } from '~/components/shared/form-control'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { useI18n } from '~/hooks/use-i18n'
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from 'lucide-react'

type QuoteItemsProps = {
  value: TQuoteItem[]
  onChange?: (value: TQuoteItem[]) => void
  errors?: Record<string, string>
}

export function QuoteItems({ value, onChange, errors }: QuoteItemsProps) {
  const { t } = useI18n()

  const updateItem = (index: number, updated: TQuoteItem) => {
    const newItems = [...value]
    newItems[index] = updated
    onChange?.(newItems)
  }

  const addItem = () => {
    const newItem: TQuoteItem = {
      title: '',
      description: '',
      price: 0,
      order: value.length,
    }
    onChange?.([...value, newItem])
  }

  const removeItem = (index: number) => {
    const newItems = value.filter((_, i) => i !== index)
    const reorderedItems = newItems.map((item, i) => ({
      ...item,
      order: i,
    }))
    onChange?.(reorderedItems)
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...value]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= newItems.length) return
    ;[newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]]

    const reorderedItems = newItems.map((item, i) => ({
      ...item,
      order: i,
    }))

    onChange?.(reorderedItems)
  }

  const getItemErrors = (index: number) => {
    if (!errors) return {}

    const itemErrors: Record<string, string> = {}
    Object.keys(errors).forEach((key) => {
      const match = key.match(new RegExp(`^items\\.${index}\\.(.+)$`))
      if (match) {
        itemErrors[match[1]] = errors[key]
      }
    })
    return itemErrors
  }

  const sortedItems = [...value].sort((a, b) => a.order - b.order)

  return (
    <>
      {sortedItems.map((item, index) => (
        <QuoteItem
          key={index}
          item={item}
          errors={getItemErrors(index)}
          onChange={(updated) => updateItem(index, updated)}
          onRemove={() => removeItem(index)}
          onMoveUp={() => moveItem(index, 'up')}
          onMoveDown={() => moveItem(index, 'down')}
          canMoveUp={index > 0}
          canMoveDown={index < sortedItems.length - 1}
        />
      ))}

      <div className="flex justify-center items-center mt-4">
        <Button type="button" onClick={addItem}>
          <PlusIcon />
          {t('features.quote.quote-form.buttons.add')}
        </Button>
      </div>
    </>
  )
}

export type QuoteItemProps = {
  item: TQuoteItem
  onChange?: (item: TQuoteItem) => void
  onRemove?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  canMoveUp?: boolean
  canMoveDown?: boolean
  errors?: Record<string, string>
}

export function QuoteItem({
  item,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp = true,
  canMoveDown = true,
  errors = {},
}: QuoteItemProps) {
  const { t } = useI18n()

  return (
    <div className={'flex gap-4'}>
      <div className={'flex flex-col gap-4 flex-1'}>
        <FormRow>
          <FormControl error={errors.title}>
            <Label>{t('features.quote.quote-form.fields.title')}</Label>
            <Input
              type="text"
              value={item.title}
              onChange={(e) => onChange?.({ ...item, title: e.target.value })}
            />
          </FormControl>
          <FormControl error={errors.price}>
            <Label>{t('features.quote.quote-form.fields.price')}</Label>
            <Input
              type="number"
              value={item.price}
              onChange={(e) => onChange?.({ ...item, price: +e.target.value })}
            />
          </FormControl>
        </FormRow>
        <FormRow>
          <FormControl error={errors.description}>
            <Label>{t('features.quote.quote-form.fields.description')}</Label>
            <Textarea
              id="description"
              name="description"
              value={item.description}
              onChange={(e) => onChange?.({ ...item, description: e.target.value })}
            />
          </FormControl>
        </FormRow>
      </div>
      <div className={'flex flex-col gap-4 justify-end'}>
        <Button type="button" size={'icon'} onClick={onMoveUp} disabled={!canMoveUp}>
          <ArrowUpIcon />
        </Button>
        <Button type="button" size={'icon'} variant={'destructive'} onClick={onRemove}>
          <TrashIcon />
        </Button>
        <Button type="button" size={'icon'} onClick={onMoveDown} disabled={!canMoveDown}>
          <ArrowDownIcon />
        </Button>
      </div>
    </div>
  )
}
