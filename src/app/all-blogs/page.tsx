import AllBlogs from "@/components/Blogs/AllBlogs";
import CreateBlog from "@/components/Blogs/CreateBlog";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductTable from "@/components/Tables/ProductTable";
import React from "react";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Blogs" />

      <div className="flex flex-col gap-10">
        <AllBlogs/>
      </div>
    </DefaultLayout>
  );
};

export default page;
