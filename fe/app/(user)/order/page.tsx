import { cookies } from "next/headers";
import OrderList from "./order-list";
import { OrderMobileType } from "@/lib/validate/order";
import OrderApi from "@/lib/api/mobile/order";

const Page = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  let orders: OrderMobileType[] = [];

  try {
    const res = await OrderApi.getOrderByUser(accessToken);
    orders = res;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }

  return <OrderList orders={orders} />;
};

export default Page;
