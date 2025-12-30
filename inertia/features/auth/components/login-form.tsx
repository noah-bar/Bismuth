import { Button } from '@/components/ui/button'
import { FormControl } from '@/components/shared/form-control'
import { FormRow } from '@/components/shared/form-row'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@inertiajs/react'
import { FormEvent, FormHTMLAttributes } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useI18n } from '@/hooks/use-i18n'
import { cn } from '~/lib/utils'

export type LoginFormProps = FormHTMLAttributes<HTMLFormElement>
export function LoginForm({ className, ...props }: LoginFormProps) {
  const { t } = useI18n()
  const form = useForm({
    email: '',
    password: '',
  })

  const formEnabled = form.data.email && form.data.password

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/login', {
      onFinish: () => form.reset('password'),
    })
  }

  return (
    <form className={cn('flex flex-col gap-4', className)} onSubmit={handleSubmit} {...props}>
      <div className={'flex flex-col items-center justify-center gap-2 text-center'}>
        <img
          className={'size-12'}
          alt={t('features.auth.login-form.logoAlt')}
          src={'/web-app-manifest-192x192.png'}
        />
        <h1 className={'text-xl font-semibold'}>{t('features.auth.login-form.title')}</h1>
        <span className={'text-muted-foreground'}>{t('features.auth.login-form.subtitle')}</span>
      </div>
      <FormRow>
        <FormControl
          error={
            'E_INVALID_CREDENTIALS' in form.errors
              ? (form.errors.E_INVALID_CREDENTIALS as string)
              : ''
          }
        >
          <Label htmlFor={'email'}>{t('features.auth.login-form.fields.email.label')}</Label>
          <Input
            type={'email'}
            placeholder={t('features.auth.login-form.fields.email.placeholder')}
            name={'email'}
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl error={form.errors.password}>
          <Label htmlFor={'password'}>{t('features.auth.login-form.fields.password.label')}</Label>
          <Input
            type={'password'}
            placeholder={t('features.auth.login-form.fields.password.placeholder')}
            name={'password'}
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
          />
        </FormControl>
      </FormRow>
      <Button type="submit" disabled={form.processing || !formEnabled}>
        {t('features.auth.login-form.buttons.submit')}
        {form.processing && <Spinner />}
      </Button>
    </form>
  )
}
