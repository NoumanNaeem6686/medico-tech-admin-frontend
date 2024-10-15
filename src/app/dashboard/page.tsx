import Dashboard from '@/components/Dashboard/Dashboard'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

async function page() {
    return (
        <DefaultLayout>
            <Dashboard/>
        </DefaultLayout>
    )
}

export default page