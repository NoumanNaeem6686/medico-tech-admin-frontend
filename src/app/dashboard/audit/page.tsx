import AuditTable from '@/components/audit/AuditTable'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
function MainContact() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Audit Information" />
            <div className="flex flex-col gap-10">
                <AuditTable />
            </div>
        </DefaultLayout>
    )
}

export default MainContact