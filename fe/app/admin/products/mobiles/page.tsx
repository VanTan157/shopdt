import ReqApi from "@/lib/ResApi";
import MobileTable from "./tbl-mobiles";
import Link from "next/link";
import BtnAddMobile from "./btn-add-mobile";

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
  let product_types = null;
  try {
    product_types = await ReqApi.getAllMobileType();
    console.log(product_types);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  return (
    <div>
      <div>
        <div className="flex space-x-4 border-b-2">
          {product_types?.map((product_type) => (
            <div key={product_type._id}>
              <Link href={`/admin/products/mobiles/${product_type._id}`}>
                {product_type.type}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 w-full">
        <BtnAddMobile type={product_types || []} />
      </div>
      <MobileTable mobiles={products || []} />
    </div>
  );
};
export default ProductPage;
