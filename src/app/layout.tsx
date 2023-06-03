import "@/styles/globals.css";
import { Inter } from "next/font/google";
import AppProviders from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AppProviders>
          {/* // TODO: Portal para modales */}
          {/* <div className="z-50"></div> */}
          <main className="h-screen max-h-screen overflow-hidden flex relative">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
