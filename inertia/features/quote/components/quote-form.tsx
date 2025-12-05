import { Form } from '~/components/shared/form'
import { SubmitButton } from '~/components/shared/submit-button'
import { useI18n } from '~/hooks/use-i18n'
import { useForm, usePage } from '@inertiajs/react'
import { FormEvent, FormHTMLAttributes } from 'react'
import { BackButton } from '~/components/shared/back-button'
import { CreateQuote, QuoteStatus, UpdateQuote } from '~/types/quote'
import { FormRow } from '~/components/shared/form-row'
import { FormControl } from '~/components/shared/form-control'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Company } from '~/types/company'
import { Contact } from '~/types/contact'
import { NativeSelect, NativeSelectOption } from '~/components/ui/native-select'
import { QuoteItems } from '~/features/quote/components/quote-items'
import { Switch } from '~/components/ui/switch'
import { Separator } from '~/components/ui/separator'

type QuoteFormProps = FormHTMLAttributes<HTMLFormElement> & {
  data: CreateQuote | UpdateQuote
}
export function QuoteForm({ data, onSubmit, ...props }: QuoteFormProps) {
  const { t } = useI18n()
  const { companies, contacts, statuses } = usePage<{
    companies: Company[]
    contacts: Contact[]
    statuses: QuoteStatus[]
  }>().props
  const form = useForm<CreateQuote | UpdateQuote>(data)
  const id = 'id' in form.data ? form.data.id : undefined
  const editMode = !!id
  const formTitle = editMode
    ? t('features.quote.quote-form.title.edit')
    : t('features.quote.quote-form.title.create')

  const totalPrice = form.data.items?.reduce((acc, item) => (acc += item.price), 0) || 0

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (onSubmit) {
      onSubmit(e)
      return
    }

    if (editMode) {
      form.patch(`/quotes/${id}`)
      return
    }

    form.post(`/quotes`)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      header={<h1 className={'text-xl font-semibold'}>{formTitle}</h1>}
      footer={
        <div className={'flex size-full items-center justify-between'}>
          <BackButton isDirty={form.isDirty} />
          <SubmitButton isProcessing={form.processing} disabled={!form.isDirty} />
        </div>
      }
      {...props}
    >
      <FormRow>
        <FormControl error={form.errors.title}>
          <Label htmlFor={'title'}>{t('features.quote.quote-form.fields.title')}</Label>
          <Input
            id={'title'}
            name={'title'}
            value={form.data.title}
            onChange={(e) => form.setData('title', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.date}>
          <Label htmlFor={'date'}>{t('features.quote.quote-form.fields.date')}</Label>
          <Input
            id={'date'}
            name={'date'}
            type={'date'}
            value={form.data.date}
            onChange={(e) => form.setData('date', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.version}>
          <Label htmlFor={'version'}>{t('features.quote.quote-form.fields.version')}</Label>
          <Input
            id={'version'}
            name={'version'}
            type={'number'}
            value={form.data.version}
            onChange={(e) => form.setData('version', +e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.companyId}>
          <Label htmlFor={'companyId'}>{t('features.quote.quote-form.fields.company')}</Label>
          <NativeSelect
            value={form.data.companyId}
            onChange={(e) => form.setData('companyId', +e.target.value)}
          >
            <NativeSelectOption value={''}></NativeSelectOption>
            {companies.map((company) => (
              <NativeSelectOption key={company.id} value={company.id}>
                {company.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl error={form.errors.contactId}>
          <Label htmlFor={'contactId'}>{t('features.quote.quote-form.fields.contact')}</Label>
          <NativeSelect
            value={form.data.contactId}
            onChange={(e) => form.setData('contactId', +e.target.value)}
          >
            <NativeSelectOption value={''}></NativeSelectOption>
            {contacts.map((contact) => (
              <NativeSelectOption key={contact.id} value={contact.id}>
                {contact.fullName}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.currency}>
          <Label htmlFor={'currency'}>{t('features.quote.quote-form.fields.currency')}</Label>
          <NativeSelect
            value={form.data.currency}
            onChange={(e) => form.setData('currency', e.target.value as 'CHF' | 'EUR' | 'USD')}
          >
            <NativeSelectOption value={'CHF'}>CHF</NativeSelectOption>
            <NativeSelectOption value={'EUR'}>EUR</NativeSelectOption>
            <NativeSelectOption value={'USD'}>USD</NativeSelectOption>
          </NativeSelect>
        </FormControl>
        <FormControl error={form.errors.status}>
          <Label htmlFor={'status'}>{t('features.quote.quote-form.fields.status')}</Label>
          <NativeSelect
            value={form.data.status}
            onChange={(e) => form.setData('status', e.target.value as QuoteStatus)}
          >
            {statuses.map((status) => (
              <NativeSelectOption key={status} value={status}>
                {t(`features.quote.status.${status}`)}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl
          className={'flex-col-reverse md:flex-row md:justify-center md:items-center'}
          error={form.errors.taxIncluded}
        >
          <Switch
            id={'taxIncluded'}
            checked={form.data.taxIncluded}
            onCheckedChange={(e) => form.setData('taxIncluded', e)}
          />
          <Label htmlFor={'taxIncluded'}>{t('features.quote.quote-form.fields.taxIncluded')}</Label>
        </FormControl>
      </FormRow>
      <div className="flex items-center flex-row gap-4">
        <div className="font-semibold whitespace-nowrap">
          {t('features.quote.quote-form.elements')} ({form.data.items?.length || 0}) ({t('features.quote.quote-form.total')} {totalPrice} {form.data.currency})
        </div>
        <Separator className="flex-1" />
      </div>
      <QuoteItems
        value={form.data.items || []}
        onChange={(e) => form.setData('items', e)}
        errors={form.errors}
      />
    </Form>
  )
}
