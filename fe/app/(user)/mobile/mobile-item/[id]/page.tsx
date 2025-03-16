import { ProductType } from "@/app/validate";
import https from "@/lib/http";
import Image from "next/image";
import BtnBuyNow from "../../btn-buy-now";
import BtnAddCart from "../../btn-add-cart";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  let product: ProductType | null = null;

  try {
    const res = await https.get<ProductType>(`products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    product = res;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <h1 className="pt-4 text-center text-red-500 text-2xl font-semibold">
        Sản phẩm không tồn tại!
      </h1>
    );
  }

  if (!product) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Phần hình ảnh */}
        <div className="relative flex justify-center">
          <Image
            src={`http://localhost:8080${product.image}`}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain rounded-lg shadow-md max-h-[400px] w-full"
            quality={100}
          />
          {product.IsPromotion && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              -{Math.round(product.promotion * 100)}%
            </div>
          )}
        </div>

        {/* Phần thông tin sản phẩm */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-2xl md:text-3xl font-semibold text-red-600">
              {product.finalPrice.toLocaleString()} VND
            </p>
            {product.IsPromotion && (
              <p className="text-lg text-gray-500 line-through">
                {(product.StartingPrice || 0).toLocaleString()} VND
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <BtnBuyNow product={product} />
            <BtnAddCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
