import { cookies } from "next/headers";
import OrderList from "../order-list";
import { OrderMobileType } from "@/lib/validate/order";
import OrderApi from "@/lib/api/mobile/order";

const Page = async ({ params }: { params: { status: string } }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const { status } = await params;
  const s = decodeURIComponent(status);
  let orders: OrderMobileType[] = [];
  try {
    const res = await OrderApi.getOrderByStatus({ s, accessToken });
    orders = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  return <OrderList orders={orders} />;
};

export default Page;
