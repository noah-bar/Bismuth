import { Form } from '@/components/shared/form'
import { FormControl } from '@/components/shared/form-control'
import { FormRow } from '@/components/shared/form-row'
import { SubmitButton } from '@/components/shared/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/hooks/use-i18n'
import { useForm } from '@inertiajs/react'
import { FormEvent, FormHTMLAttributes } from 'react'
import { BackButton } from '@/components/shared/back-button'
import { CreateCompany, UpdateCompany } from '~/types/company'

type CompanyFormProps = FormHTMLAttributes<HTMLFormElement> & {
  data: CreateCompany | UpdateCompany
}
export function CompanyForm({ data, onSubmit, ...props }: CompanyFormProps) {
  const { t } = useI18n()
  const form = useForm<CreateCompany | UpdateCompany>(data)
  const id = 'id' in form.data ? form.data.id : undefined
  const editMode = !!id
  const formTitle = editMode
    ? t('features.company.company-form.title.edit')
    : t('features.company.company-form.title.create')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (onSubmit) {
      onSubmit(e)
      return
    }

    if (editMode) {
      form.patch(`/companies/${id}`)
      return
    }

    form.post(`/companies`)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      header={<h1 className={'text-xl font-semibold'}>{formTitle}</h1>}
      footer={
        <div className={'flex size-full justify-between'}>
          <BackButton isDirty={form.isDirty} />
          <SubmitButton isProcessing={form.processing} disabled={!form.isDirty} />
        </div>
      }
      {...props}
    >
      <FormRow>
        <FormControl error={form.errors.name}>
          <Label htmlFor={'name'}>{t('features.company.company-form.fields.name')}</Label>
          <Input
            type={'text'}
            value={form.data.name}
            onChange={(e) => form.setData('name', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.address}>
          <Label htmlFor={'address'}>{t('features.company.company-form.fields.address')}</Label>
          <Input
            type={'text'}
            value={form.data.address}
            onChange={(e) => form.setData('address', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.postalCode}>
          <Label htmlFor={'postal_code'}>
            {t('features.company.company-form.fields.postalCode')}
          </Label>
          <Input
            type={'text'}
            value={form.data.postalCode}
            onChange={(e) => form.setData('postalCode', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.city}>
          <Label htmlFor={'city'}>{t('features.company.company-form.fields.city')}</Label>
          <Input
            type={'text'}
            value={form.data.city || ''}
            onChange={(e) => form.setData('city', e.target.value)}
          />
        </FormControl>
      </FormRow>
    </Form>
  )
}
