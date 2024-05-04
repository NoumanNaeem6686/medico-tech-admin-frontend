import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ProductTable from '@/components/Tables/ProductTable'
import React from 'react'

const page = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Product" />

    <div className="flex flex-col gap-10">
      <ProductTable />
     
    </div>
  </DefaultLayout>
  )
}

export default page