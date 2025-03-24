import { cookies } from "next/headers";
import CartClient from "./cart-client";
import { OrderItemMobileType } from "@/lib/validate/order";
import OrderApi from "@/lib/api/mobile/order";
// Import Client Component

const Page = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  let carts: OrderItemMobileType[] = [];
  try {
    const res = await OrderApi.getOrderItemNoCart(accessToken);
    carts = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log("Lỗi không xác định");
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-full mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Giỏ hàng của bạn
        </h1>
        <CartClient initialCarts={carts} />
      </div>
    </div>
  );
};

export default Page;
