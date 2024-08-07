"use client"
import AllBlogs from "@/components/Blogs/AllBlogs";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blogs" />
      <div className="flex flex-col gap-10">
        <AllBlogs />
      </div>
    </DefaultLayout>
  );
};

export default page;
