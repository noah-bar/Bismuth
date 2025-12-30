import { Form } from '~/components/shared/form'
import { BackButton } from '~/components/shared/back-button'
import { SubmitButton } from '~/components/shared/submit-button'
import { useForm } from '@inertiajs/react'
import { FormRow } from '~/components/shared/form-row'
import { FormControl } from '~/components/shared/form-control'
import { UpdateProfile } from '~/types/user'
import { FormEvent, FormHTMLAttributes } from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '~/components/ui/input'
import { useI18n } from '~/hooks/use-i18n'
import { useAuth } from '~/features/auth'
import { Separator } from '~/components/ui/separator'
import { toast } from 'sonner'
import { sanitizeFormData } from '~/lib/utils'

type ProfileFormProps = FormHTMLAttributes<HTMLFormElement> & {
  data: UpdateProfile
}
export function ProfileForm({ data, onSubmit, ...props }: ProfileFormProps) {
  const { t } = useI18n()
  const { user } = useAuth()
  const form = useForm<UpdateProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    city: '',
    companyName: '',
    currentPassword: '',
    newPassword: '',
    newPassword_confirmation: '',
    ...sanitizeFormData(data),
    signature: undefined,
    companyIcon: undefined,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (onSubmit) {
      onSubmit(e)
      return
    }

    form.patch(`/profiles/${user.id}`, {
      forceFormData: true,
      onFinish: () => {
        form.reset('currentPassword', 'newPassword', 'newPassword_confirmation')
      },
      onSuccess: () => {
        if (form.data.newPassword) {
          toast.success(t('features.profile.profile-form.messages.password-changed'))
        }
      },
    })
  }

  return (
    <Form
      header={
        <h1 className={'text-xl font-semibold'}>{t('features.profile.profile-form.title')}</h1>
      }
      footer={
        <div className={'flex size-full justify-between'}>
          <BackButton isDirty={form.isDirty} />
          <SubmitButton isProcessing={form.processing} disabled={!form.isDirty} />
        </div>
      }
      onSubmit={handleSubmit}
      {...props}
    >
      <FormRow>
        <FormControl error={form.errors.firstName}>
          <Label htmlFor={'firstName'}>{t('features.profile.profile-form.fields.firstName')}</Label>
          <Input
            id={'firstName'}
            name={'firstName'}
            value={form.data.firstName}
            onChange={(e) => form.setData('firstName', e.target.value)}
            disabled
          />
        </FormControl>
        <FormControl error={form.errors.lastName}>
          <Label htmlFor={'lastName'}>{t('features.profile.profile-form.fields.lastName')}</Label>
          <Input
            id={'lastName'}
            name={'lastName'}
            value={form.data.lastName}
            onChange={(e) => form.setData('lastName', e.target.value)}
            disabled
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.email}>
          <Label htmlFor={'email'}>{t('features.profile.profile-form.fields.email')}</Label>
          <Input
            id={'email'}
            name={'email'}
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
            disabled
          />
        </FormControl>
        <FormControl error={form.errors.phoneNumber}>
          <Label htmlFor={'phoneNumber'}>
            {t('features.profile.profile-form.fields.phoneNumber')}
          </Label>
          <Input
            id={'phoneNumber'}
            name={'phoneNumber'}
            value={form.data.phoneNumber}
            onChange={(e) => form.setData('phoneNumber', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.address}>
          <Label htmlFor={'address'}>{t('features.profile.profile-form.fields.address')}</Label>
          <Input
            id={'address'}
            name={'address'}
            value={form.data.address}
            onChange={(e) => form.setData('address', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.postalCode}>
          <Label htmlFor={'postalCode'}>
            {t('features.profile.profile-form.fields.postalCode')}
          </Label>
          <Input
            id={'postalCode'}
            name={'postalCode'}
            value={form.data.postalCode}
            onChange={(e) => form.setData('postalCode', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.city}>
          <Label htmlFor={'city'}>{t('features.profile.profile-form.fields.city')}</Label>
          <Input
            id={'city'}
            name={'city'}
            value={form.data.city}
            onChange={(e) => form.setData('city', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.companyName}>
          <Label htmlFor={'companyName'}>
            {t('features.profile.profile-form.fields.companyName')}
          </Label>
          <Input
            id={'companyName'}
            name={'companyName'}
            value={form.data.companyName}
            onChange={(e) => form.setData('companyName', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.companyIcon}>
          <Label htmlFor={'companyIcon'}>
            {t('features.profile.profile-form.fields.companyIcon')}
          </Label>
          <Input
            type={'file'}
            id={'companyIcon'}
            name={'companyIcon'}
            onChange={(e) => form.setData('companyIcon', e.target.files?.[0])}
          />
          <div className={'flex justify-center items-center'}>
            <img alt={'companyIcon'} src={user.companyIconUrl} className={'h-12.5'} />
          </div>
        </FormControl>
        <FormControl error={form.errors.signature}>
          <Label htmlFor={'signature'}>{t('features.profile.profile-form.fields.signature')}</Label>
          <Input
            type={'file'}
            id={'signature'}
            name={'signature'}
            onChange={(e) => form.setData('signature', e.target.files?.[0])}
          />
          <div className={'flex justify-center items-center'}>
            <img alt={'signature'} src={user.signatureUrl} className={'w-25'} />
          </div>
        </FormControl>
      </FormRow>
      <div className="flex items-center flex-row gap-4">
        <div className="font-semibold whitespace-nowrap">
          {t('features.profile.profile-form.fields.changePassword')}
        </div>
        <Separator className="flex-1" />
      </div>
      <FormRow>
        <FormControl
          error={
            'E_INVALID_CREDENTIALS' in form.errors
              ? (form.errors.E_INVALID_CREDENTIALS as string)
              : ''
          }
        >
          <Label htmlFor={'currentPassword'}>
            {t('features.profile.profile-form.fields.currentPassword')}
          </Label>
          <Input
            type={'password'}
            id={'currentPassword'}
            value={form.data.currentPassword}
            onChange={(e) => form.setData('currentPassword', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.newPassword}>
          <Label htmlFor={'newPassword'}>
            {t('features.profile.profile-form.fields.newPassword')}
          </Label>
          <Input
            type={'password'}
            id={'newPassword'}
            value={form.data.newPassword}
            onChange={(e) => form.setData('newPassword', e.target.value)}
          />
        </FormControl>
        <FormControl error={form.errors.newPassword_confirmation}>
          <Label htmlFor={'newPassword_confirmation'}>
            {t('features.profile.profile-form.fields.newPasswordConfirmation')}
          </Label>
          <Input
            type={'password'}
            id={'newPassword_confirmation'}
            value={form.data.newPassword_confirmation}
            onChange={(e) => form.setData('newPassword_confirmation', e.target.value)}
          />
        </FormControl>
      </FormRow>
    </Form>
  )
}
