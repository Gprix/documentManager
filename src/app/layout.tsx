"use client";

import "@/styles/globals.css";
import { Pathway_Extreme } from "next/font/google";
import AppProviders from "./providers";
import useListeners from "@/hooks/useListeners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pathwayExtreme = Pathway_Extreme({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useListeners();

  return (
    <html lang="en">
      <body className={`${pathwayExtreme.className} mx-auto`}>
        <AppProviders>
          {/* // TODO: Portal para modales */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            draggable={false}
            theme="colored"
          />
          {/* <div className="z-50"></div> */}
          <main className="h-screen max-h-screen overflow-hidden flex relative">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
