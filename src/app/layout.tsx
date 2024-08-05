import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "@/store/storeProvider";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | Eleven Psychics",
    default: "Eleven Psychics", // a default is required when creating a template
  },
  description: "This is eleven psychic webiste",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();

  return (
    <html lang="en">
      <StoreProvider>
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
          <ToastContainer />
        </body>
      </StoreProvider>
    </html>
  );
}
