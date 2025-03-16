import https from "@/lib/http";
import { cookies } from "next/headers";
import { OrderType } from "../validate";
import OrderList from "./order-list";

const Page = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let orders: OrderType[] = [];

  try {
    const res = await https.get<OrderType[]>("order/find-by-user", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      credentials: "include",
    });
    orders = res;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }

  return <OrderList orders={orders} />;
};

export default Page;
