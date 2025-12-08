import { ReactNode } from 'react'
import { AppLayout } from '~/components/layouts/app-layout'
import { Box } from '~/components/shared/box'
import { ProfileForm } from '~/features/profile'
import { UpdateProfile } from '~/types/user'

type EditProps = {
  profile: UpdateProfile
}
function Edit({ profile }: EditProps) {
  return (
    <Box className={'h-full'}>
      <ProfileForm data={profile} />
    </Box>
  )
}

Edit.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Edit
