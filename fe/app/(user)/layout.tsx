import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientWrapper } from "@/components/ClientWrapper";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ClientWrapper>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
              <Header />
              <main className="flex-1">{children}</main>
              <Toaster />
            </div>
          </div>
        </SidebarProvider>
      </ClientWrapper>
    </div>
  );
}
