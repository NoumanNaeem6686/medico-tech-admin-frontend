import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import FreeMinutesTable from '@/components/Tables/FreeMinutesTable'
import React from 'react'

function page() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Free Minutes" />
            <FreeMinutesTable />
        </DefaultLayout>
    )
}

export default page