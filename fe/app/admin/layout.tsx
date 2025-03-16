import AdminHeader from "./admin-header";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
