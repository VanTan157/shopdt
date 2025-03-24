import OrderNav from "./OrderNav";

export default async function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <OrderNav />
      <div>{children}</div>
    </div>
  );
}
