import { LoginForm } from '~/features/auth'
import { GuessLayout } from '~/components/layouts/guess-layout'

export default function Create() {
  return (
    <GuessLayout>
      <div className={'size-full flex justify-center items-center p-4 overflow-hidden'}>
        <LoginForm className={'w-full max-w-md bg-background p-2 rounded-lg'} />
      </div>
    </GuessLayout>
  )
}
