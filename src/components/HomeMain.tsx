"use client";
import { useEffect, useState } from "react";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/app/auth/signin/page";

export default function HomeMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    setIsLoggedIn(!!loginStatus);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
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