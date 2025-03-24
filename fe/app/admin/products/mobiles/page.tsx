import MobileTable from "./tbl-mobiles";
import MobileApi from "@/lib/api/mobile/mobile";

const ProductPage = async () => {
  let products = null;
  try {
    products = await MobileApi.getAllMobile();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  let product_types = null;
  try {
    product_types = await MobileApi.getAllMobileType();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  return (
    <div>
      <div className="pt-4 w-full"></div>
      <MobileTable mobiles={products || []} type={product_types || []} />
    </div>
  );
};
export default ProductPage;
