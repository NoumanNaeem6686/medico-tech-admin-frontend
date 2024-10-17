import CreateBlog from "@/components/Blogs/CreateBlog";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Blog" />

      {/* <div className="flex flex-col gap-10">
        <CreateBlog />
      </div> */}
    </DefaultLayout>
  );
};

export default page;
