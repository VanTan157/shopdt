import ReqApi from "@/lib/ResApi";
import MobileNav from "./MobileNav"; // Component mới

export default async function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let product_types = null;
  try {
    const res = await ReqApi.getAllMobileType();
    product_types = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }

  return (
    <div className="pt-16">
      <MobileNav product_types={product_types} />
      <div className="pt-8">{children}</div>
    </div>
  );
}
