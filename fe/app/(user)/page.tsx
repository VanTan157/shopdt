import ReqApi from "@/lib/ResApi";
import ProductList from "./mobile/product-list";

export default async function Home() {
  let products = null;
  try {
    const res = await ReqApi.getAllMobile();
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
    <div className="bg-gray-50 pt-16 min-h-screen">
      {/* Sản phẩm khuyến mãi */}
      <section className="container mx-auto px-4 py-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Sản Phẩm Khuyến Mãi
        </h1>
        <ProductList products={promotionaProducts} />
      </section>

      {/* Sản phẩm bán chạy */}
      <section className="container mx-auto px-4 py-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Sản Phẩm Bán Chạy
        </h1>
        <ProductList products={bestSellingProducts || []} />
      </section>
    </div>
  );
}
