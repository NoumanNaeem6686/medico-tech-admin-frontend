"use client"

import SignInMain from "@/components/SigninMain";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SignIn = () => {
  const router = useRouter()
  //@ts-ignore
  const loggedInUser = useSelector((state) => state.admin.isUserLogined);
  console.log("🚀 ~ HomeMain ~ loggedInUser:", loggedInUser)
  useEffect(() => {
    if (loggedInUser) {
      router.push("/dashboard")
    }
  }, [loggedInUser])
  return <SignInMain />;
};

export default SignIn;
