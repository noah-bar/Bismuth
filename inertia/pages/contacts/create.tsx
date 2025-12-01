import { AppLayout } from '@/components/layouts/app-layout'
import { JSX, ReactNode } from 'react'
import { ContactForm } from '@/features/contact'
import { Box } from '@/components/shared/box'
import { CreateContact } from '~/types/contact'

type CreateProps = { contact: CreateContact }
function Create({ contact }: CreateProps): JSX.Element {
  return (
    <Box className={'size-full'}>
      <ContactForm data={contact} />
    </Box>
  )
}

Create.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Create
