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
import { CreateContact, UpdateContact } from '~/types/contact'

type ContactFormProps = FormHTMLAttributes<HTMLFormElement> & {
  data: CreateContact | UpdateContact
}
export function ContactForm({ data, onSubmit, ...props }: ContactFormProps) {
  const { t } = useI18n()
  const form = useForm<CreateContact | UpdateContact>(data)
  const id = 'id' in form.data ? form.data.id : undefined
  const editMode = !!id
  const formTitle = editMode
    ? t('features.contact.contact-form.title.edit')
    : t('features.contact.contact-form.title.create')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (onSubmit) {
      onSubmit(e)
      return
    }

    if (editMode) {
      form.patch(`/contacts/${id}`)
      return
    }

    form.post(`/contacts`)
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
        <FormControl error={form.errors.firstName}>
          <Label htmlFor={'firstName'}>
            {t('features.contact.contact-form.fields.first_name')}
          </Label>
          <Input
            type={'text'}
            value={form.data.firstName}
            onChange={(e) => form.setData('firstName', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.lastName}>
          <Label htmlFor={'lastName'}>{t('features.contact.contact-form.fields.last_name')}</Label>
          <Input
            type={'text'}
            value={form.data.lastName}
            onChange={(e) => form.setData('lastName', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.email}>
          <Label htmlFor={'email'}>{t('features.contact.contact-form.fields.email')}</Label>
          <Input
            type={'text'}
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
          />
        </FormControl>
      </FormRow>
    </Form>
  )
}
