import { AppLayout } from '@/components/layouts/app-layout'
import { JSX, ReactNode } from 'react'
import { CompanyForm } from '@/features/company'
import { Box } from '@/components/shared/box'
import { UpdateCompany } from '~/types/company'

type EditProps = { company: UpdateCompany }
function Edit({ company }: EditProps): JSX.Element {
  return (
    <Box className={'size-full'}>
      <CompanyForm data={company} />
    </Box>
  )
}

Edit.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Edit
