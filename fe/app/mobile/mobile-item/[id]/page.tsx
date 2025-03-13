import { ProductType } from "@/app/validate";
import https from "@/lib/http";
import Image from "next/image";
import BtnBuyNow from "../../btn-buy-now";

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
      <h1 className="pt-4 text-center text-red-500">Sản phẩm không tồn tại!</h1>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Image
            src={`http://localhost:8080${product.image}`}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover rounded-lg shadow-lg"
            quality={100}
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-red-600">
            {product.price.toLocaleString()} VND
          </p>
          <div className="flex space-x-4">
            <BtnBuyNow product={product} />
            <button className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
