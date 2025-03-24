export default async function AdminOrderMobilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-2 bg-white">{children}</div>;
}
