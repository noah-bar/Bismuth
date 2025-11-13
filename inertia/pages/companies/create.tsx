import { AppLayout } from '@/components/layouts/app-layout';
import { JSX, ReactNode } from 'react';
import { CompanyForm } from '@/features/company';
import { Box } from '@/components/shared/box';
import { CreateCompany } from '~/types/company'

type CreateProps = { company: CreateCompany };
function Create({ company }: CreateProps): JSX.Element {
    return <Box className={"size-full"}>
        <CompanyForm data={company}/>
    </Box>;
}

Create.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
export default Create;
