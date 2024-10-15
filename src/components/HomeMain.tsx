"use client";
import { useSelector } from "react-redux";

import SignIn from "@/app/auth/signin/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeMain() {
  const router = useRouter()
  //@ts-ignore
  const loggedInUser = useSelector((state) => state.admin.isUserLogined);
  console.log("🚀 ~ HomeMain ~ loggedInUser:", loggedInUser)
  useEffect(() => {
    if (loggedInUser) {
      router.push("/dashboard")
    }
  }, [loggedInUser])

  return (
    <>
      <SignIn />
    </>
  );
}
