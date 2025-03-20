import ReqApi from "@/lib/ResApi";
import ProductList from "./product-list";

const MobilePage = async () => {
  let products = null;
  try {
    const res = await ReqApi.getAllMobile();
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
