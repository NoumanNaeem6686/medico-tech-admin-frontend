"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInAdmin } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import logo from "../../public/images/logo/logo.png";

const SignInMain = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let missingFields = [];
    if (!email) {
      missingFields.push("Email");
    }
    if (!password) {
      missingFields.push("Password");
    }
    if (missingFields.length > 0) {
      let fieldsString = missingFields.join(", ");
      toast.error(`Please fill out all required fields: ${fieldsString}`);
      return false;
    }
    const data = {
      email,
      password,
    };

    try {
      setLoading(true); // Set loading to true before making the request
      //@ts-ignore
      const res: any = await dispatch(signInAdmin(data));
      setLoading(false); // Set loading to false after receiving the response
      console.log("🚀 ~ handleLogin ~ res:", res);
      if (res.payload.success) {
        toast.success("Login Successfully");
        router.push("/dashboard");
        setEmail("");
        setPassword("");
      } else {
        toast.error(res.payload);
      }
    } catch (error: any) {
      console.log(error.message); //@ts-ignore
      toast.error("Wrong Credentials!");
    } finally {
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={logo}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={logo}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="2xl:px-20">
                A psychic connection, like no other.
              </p>
              <span className="mt-15 inline-block">
                <svg
                  width="350"
                  height="350"
                  viewBox="0 0 350 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG content */}
                </svg>
              </span>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Eleven Psychics Admin Portal
              </h2>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-[#547587] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-#547587"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="#547587"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-[#547587] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span
                      className="absolute right-4 top-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaRegEyeSlash fontSize={20} className="text-[#547587]" />
                      ) : (
                        <FaRegEye fontSize={20} className="text-[#547587]" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-[#547587] bg-[#547587] p-4 text-white transition hover:bg-opacity-90"
                    disabled={loading}
                  >
                    {loading ? (
                      <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                    ) : null}
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default SignInMain;
