export default async function AdminMobilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pl-4 pt-2">{children}</div>;
}
