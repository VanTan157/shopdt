import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ClientWrapper";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import ReqApi from "@/lib/ResApi";
import { AccountType } from "./validate";
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
  let user: AccountType | null = null;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <UserProvider
          initialUser={user}
          initialrefreshToken={refreshToken}
          initialaccessToken={accessToken}
        >
          <ClientWrapper>
            <main className="flex-1">{children}</main>
            <Toaster />
          </ClientWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
