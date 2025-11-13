import { LoginForm } from '~/features/auth'
import { GuessLayout } from '~/components/layouts/guess-layout'

export default function Create() {
  return (
    <GuessLayout>
      <div className={"size-full flex justify-center items-center"}>
        <LoginForm className={"w-full max-w-md"}/>
      </div>
    </GuessLayout>
  )
}
