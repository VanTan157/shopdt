import ProductList from "./mobile/product-list";
import MobileApi from "@/lib/api/mobile/mobile";

export default async function Home() {
  let products = null;
  try {
    const res = await MobileApi.getAllMobile();
    products = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }

  const promotionaProducts =
    products?.filter((product) => product.promotion) || [];
  const bestSellingProducts =
    products?.filter((product) => !product.promotion) || [];

  return (
    <div className="bg-white pt-18 min-h-screen">
      {/* Sản phẩm khuyến mãi */}
      <section className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800  text-center">
          Sản Phẩm Khuyến Mãi
        </h1>
        <ProductList products={promotionaProducts} />
      </section>

      {/* Sản phẩm bán chạy */}
      <section className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Sản Phẩm Bán Chạy
        </h1>
        <ProductList products={bestSellingProducts || []} />
      </section>
    </div>
  );
}
