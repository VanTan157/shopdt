import https from "../../http";
import { OrderItemMobileType, OrderMobileType } from "../../validate/order";

const OrderApi = {
  getOrderByStatus: async ({
    s,
    accessToken,
  }: {
    s: string;
    accessToken: string;
  }) =>
    https.get<OrderMobileType[]>(`order/find-by-status?status=${s}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      credentials: "include",
    }),

  getOrderByUser: async (accessToken: string) =>
    https.get<OrderMobileType[]>("order/find-by-user", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      credentials: "include",
    }),
  getOrderItemNoCart: async (accessToken: string) =>
    https.get<OrderItemMobileType[]>(`order-items/get-order-not-in-cart`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      credentials: "include",
    }),
  removeOrderItem: async (id: string) =>
    https.delete(`order-items/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }),
  addOrderItemInOrder: async ({
    selectedItems,
    phone,
    address,
  }: {
    selectedItems: string[];
    phone: string;
    address: string;
  }) =>
    https.post(
      `/order`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      {
        orderitem_ids: selectedItems,
        phone_number: phone,
        address,
      }
    ),
};

export default OrderApi;
