import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToastProvider } from "../../lib/ToastProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tao-Arts - Admin Auth",
  description: "Admin Auth for Tao-Arts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider/>
            <div className="flex max-lg:flex-col text-grey-1">
              <LeftSideBar />
              <TopBar />
              <div className="flex-1">{children}</div>
            </div>
   
        </body>
      </html>
    </ClerkProvider>
  );
}
