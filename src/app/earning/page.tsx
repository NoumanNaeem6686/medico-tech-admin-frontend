import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

function page() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Psychics Earning" />
            <div>page</div>
        </DefaultLayout>
    )
}

export default page