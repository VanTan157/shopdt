import ReqApi from "@/lib/ResApi";
import MobileTable from "./tbl-mobiles";
import { Button } from "@/components/ui/button";

const ProductPage = async () => {
  let products = null;
  try {
    products = await ReqApi.getAllMobile();
    console.log(products);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  return (
    <div className="pt-4">
      <Button>Thêm sản phẩm</Button>
      <MobileTable mobiles={products || []} />
    </div>
  );
};
export default ProductPage;
