import { AppLayout } from '@/components/layouts/app-layout'
import { JSX, ReactNode } from 'react'
import { ContactForm } from '@/features/contact'
import { Box } from '@/components/shared/box'
import { UpdateContact } from '~/types/contact'

type EditProps = { contact: UpdateContact }
function Edit({ contact }: EditProps): JSX.Element {
  return (
    <Box className={'size-full'}>
      <ContactForm data={contact} />
    </Box>
  )
}

Edit.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Edit
