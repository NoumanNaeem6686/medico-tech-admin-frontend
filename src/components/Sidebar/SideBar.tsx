"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { CiUser } from "react-icons/ci";
import {
  DollarSign,
  Gem,
  HandCoins,
  LayoutDashboard,
  Newspaper,
  Phone,
  RepeatIcon,
  ShieldCheck,
  ShieldPlus,
  Store,
  UserRound,
} from "lucide-react";
import { IMAGES } from "../../../public/images/Index";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#3caad8] shadow-lg duration-300 ease-linear dark:bg-[#1a1a1a] lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            src={IMAGES.LOGO_WHITE}
            alt="logo"
            width={250}
            height={250}
            className="mx-auto my-4"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* Menu Group */}
          <div>
            <ul className="flex flex-col gap-1.5">
              <Link
                href="/dashboard"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-white hover:text-[#1a1a1a] ${
                  pathname === "/dashboard" && "bg-white !text-[#1a1a1a]"
                }`}
              >
                <LayoutDashboard />
                Dashboard
              </Link>

              <li>
                <Link
                  href="/dashboard/all-blogs"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-white hover:text-[#1a1a1a] ${
                    pathname == "/dashboard/all-blogs" &&
                    "bg-white !text-[#1a1a1a]"
                  }`}
                >
                  <Newspaper /> Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/contact"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-white hover:text-[#1a1a1a] ${
                    pathname == "/dashboard/contact" &&
                    "bg-white !text-[#1a1a1a]"
                  }`}
                >
                  <Phone /> Contact Info
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/audit"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-white hover:text-[#1a1a1a] ${
                    pathname == "/dashboard/audit" && "bg-white !text-[#1a1a1a]"
                  }`}
                >
                  <RepeatIcon /> Audit Info
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
