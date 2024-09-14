import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TransactionTable from '@/components/Tables/TransectionTable'
import React from 'react'

function page() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Transection" />
            <TransactionTable />
        </DefaultLayout>
    )
}

export default page