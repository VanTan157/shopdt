import ReqApi from "@/lib/ResApi";
import BtnAddMobile from "./btn-add-mobile";
import BtnAddType from "./btn-add-type";
import BtnDeleteType from "./btn-delete-type";
import MobileNavAdmin from "./mobile-nav-admin";

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
      <MobileNavAdmin mobileType={product_types || []} />
      <div className="pt-4 flex space-x-4">
        <BtnAddMobile type={product_types || []} />
        <BtnAddType />
        <BtnDeleteType types={product_types || []} />
      </div>
    </div>
  );
};

export default ProductTypesList;
