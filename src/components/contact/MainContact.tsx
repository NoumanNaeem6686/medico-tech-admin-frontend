import React from 'react'
import DefaultLayout from '../Layouts/DefaultLayout'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import UserContactTable from './ContactTable'

function MainContact() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Contact Information" />
            <div className="flex flex-col gap-10">
                <UserContactTable />
            </div>
        </DefaultLayout>
    )
}

export default MainContact