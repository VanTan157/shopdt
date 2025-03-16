import { OrderType } from "@/app/validate";
import https from "@/lib/http";
import { cookies } from "next/headers";
import OrderList from "../order-list";

const Page = async ({ params }: { params: { status: string } }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { status } = await params;
  const s = decodeURIComponent(status);
  let orders: OrderType[] = [];
  try {
    const res = await https.get<OrderType[]>(
      `order/find-by-status?status=${s}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        credentials: "include",
      }
    );
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
