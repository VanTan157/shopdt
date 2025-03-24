import OrderApi from "@/lib/api/mobile/order";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";
import TblOrder from "./tbl-orders";

const OrderPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let orders = null;
  try {
    orders = await OrderApi.getAllOrder(accessToken as string);
    console.log(orders);
  } catch (error) {
    if (error instanceof HttpError) console.log(error.message);
    else console.log(error);
  }
  return (
    <div>
      <TblOrder orders={orders || []} />
    </div>
  );
};
export default OrderPage;
