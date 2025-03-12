import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientWrapper } from "@/components/ClientWrapper";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import ReqApi from "@/lib/ResApi";
import { UserProvider } from "@/app/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop",
  description: "A web built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let user = null;
  try {
    const res = await ReqApi.getMe(accessToken as string);
    user = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log("Lỗi không xác định");
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ClientWrapper>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                <Header />
                <main className="flex-1">
                  <UserProvider initialUser={user}>{children}</UserProvider>
                </main>
                <Toaster />
              </div>
            </div>
          </SidebarProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
