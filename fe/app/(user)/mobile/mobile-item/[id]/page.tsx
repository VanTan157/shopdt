import { MobileType } from "@/lib/validate/mobile";
import MobileItem from "./mobile-item";
import MobileApi from "@/lib/api/mobile/mobile";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  let product: MobileType | null = null;

  try {
    const res = await MobileApi.getMobileById(id);
    product = res;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <h1 className="pt-4 text-center text-red-500 text-2xl font-semibold">
        Sản phẩm không tồn tại!
      </h1>
    );
  }

  return <MobileItem product={product} />;
};

export default Page;
