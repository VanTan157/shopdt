import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full bg-white pl-8">
        <AppSidebar admin={true} />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
