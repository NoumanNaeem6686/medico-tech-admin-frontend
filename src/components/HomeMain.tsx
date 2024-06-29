"use client";
import { useSelector } from "react-redux";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/app/auth/signin/page";
import ECommerce from "./Dashboard/E-commerce";

export default function HomeMain() {
  //@ts-ignore
  const loggedInUser = useSelector((state) => state.admin.admin);
  console.log("🚀 ~ HomeMain ~ loggedInUser:", loggedInUser);

  const isLoggedIn = !!loggedInUser;

  const handleLogin = () => {
    console.log("login");
  };

  return (
    <>
      {isLoggedIn ? (
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      ) : (
        <SignIn />
      )}
    </>
  );
}
