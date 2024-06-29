"use client";
import { useSelector } from "react-redux";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/app/auth/signin/page";

export default function HomeMain() {
  //@ts-ignore
  const loggedInUser = useSelector((state) => state.admin.admin);
  console.log("🚀 ~ HomeMain ~ loggedInUser:", loggedInUser);

  const isLoggedIn = !!loggedInUser;

  const handleLogin = () => {
    // Logic to handle login
  };

  return (
    <>
      {isLoggedIn ? (
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      ) : (
        <SignIn onLogin={handleLogin} />
      )}
    </>
  );
}
