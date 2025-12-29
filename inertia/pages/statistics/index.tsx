import { ReactNode } from 'react'
import { AppLayout } from '~/components/layouts/app-layout'

function Index() {
  return <div></div>
}

Index.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Index
