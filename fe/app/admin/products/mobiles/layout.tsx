import ProductTypesList from "./get-types-list";

export default async function AdminMobilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pl-4">
      <ProductTypesList />
      {children}
    </div>
  );
}
