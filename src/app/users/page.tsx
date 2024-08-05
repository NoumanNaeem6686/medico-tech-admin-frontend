import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Users from "@/components/Users";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Users",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
const page = () => {
  return (
    <DefaultLayout>
      <Users />
    </DefaultLayout>
  );
};

export default page;
