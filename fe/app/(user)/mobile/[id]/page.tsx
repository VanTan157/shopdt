import MobileApi from "@/lib/api/mobile/mobile";
import ProductList from "../product-list";

const Page = async ({ params }: { params: { id: string } }) => {
  let products = null;
  try {
    const { id } = await params;
    const res = await MobileApi.getAllMobilebyType(id);
    products = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  return (
    <div>
      <ProductList products={products || []} />
    </div>
  );
};

export default Page;
