'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSelector } from "react-redux";
import SignIn from "./auth/signin/page";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  //@ts-ignore
  const state = useSelector(state => state.admin)
  return (
    <>
    {
      state.admin? ( <DefaultLayout>
        <ECommerce />
      </DefaultLayout>) : (
        <SignIn/>
      )
    }
     
    </>
  );
}
