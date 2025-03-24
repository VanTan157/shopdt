import ProductList from "./product-list";
import MobileApi from "@/lib/api/mobile/mobile";

const MobilePage = async () => {
  let products = null;
  try {
    const res = await MobileApi.getAllMobile();
    products = res;
    console.log(products);
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

export default MobilePage;
