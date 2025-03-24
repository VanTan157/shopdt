import ProductTypesList from "./get-types-list";

export default async function AdminMobilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-2 bg-white">
      <ProductTypesList />
      {children}
    </div>
  );
}
