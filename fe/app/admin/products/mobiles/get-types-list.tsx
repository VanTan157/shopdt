import ReqApi from "@/lib/ResApi";
import Link from "next/link";
import BtnAddMobile from "./btn-add-mobile";
import BtnAddType from "./btn-add-type";
import BtnDeleteType from "./btn-delete-type";

const ProductTypesList = async () => {
  let product_types = null;
  try {
    product_types = await ReqApi.getAllMobileType();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  return (
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
      <div className="pt-4 flex space-x-4">
        <BtnAddMobile type={product_types || []} />
        <BtnAddType />
        <BtnDeleteType types={product_types || []} />
      </div>
    </div>
  );
};

export default ProductTypesList;
