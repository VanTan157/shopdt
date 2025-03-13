// pages/cart.tsx (hoặc đường dẫn tương ứng)
import https from "@/lib/http";
import { cookies } from "next/headers";
import { CartType } from "../validate";
import CartClient from "./cart-client";
// Import Client Component

const Page = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let carts: CartType[] = [];
  try {
    const res = await https.get<CartType[]>(
      `order-items/get-order-not-in-cart`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        credentials: "include",
      }
    );
    carts = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log("Lỗi không xác định");
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Giỏ hàng của bạn
        </h1>
        {/* Truyền dữ liệu carts sang Client Component */}
        <CartClient initialCarts={carts} />
      </div>
    </div>
  );
};

export default Page;
