"use client";
import { useSelector } from "react-redux";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/app/auth/signin/page";
import Dashboard from "./Dashboard/Dashboard";

export default function HomeMain() {
  //@ts-ignore
  const loggedInUser = useSelector((state) => state.admin.isUserLogined);
  console.log("🚀 ~ HomeMain ~ loggedInUser:", loggedInUser);

  const handleLogin = () => {
    console.log("login");
  };

  return (
    <>
      {loggedInUser ? (
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      ) : (
        <SignIn />
      )}
    </>
  );
}
