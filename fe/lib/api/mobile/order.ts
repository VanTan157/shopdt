import { ColorVariantType } from "./../../validate/mobile";
import { MobileType } from "@/lib/validate/mobile";
import https from "../../http";
import {
  CartCeateMobileType,
  OrderItemMobileType,
  OrderMobileType,
} from "../../validate/order";

const OrderApi = {
  getAllOrder: async (accessToken: string) =>
    https.get<OrderMobileType[]>(`order`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      credentials: "include",
    }),

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
  editOrder: async ({
    id,
    orderUpdate,
  }: {
    id: string;
    orderUpdate: unknown;
  }) =>
    https.patch<OrderMobileType[]>(
      `order/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      orderUpdate
    ),
  deleteOrder: async ({ id }: { id: string }) =>
    https.delete<OrderMobileType[]>(`order/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }),
  addToCart: async ({
    product,
    quantity,
    colorVariants,
  }: {
    product: MobileType;
    quantity: number;
    colorVariants: ColorVariantType;
  }) =>
    https.post<CartCeateMobileType>(
      "/order-items",
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      {
        mobile_id: product._id,
        quantity,
        colorVariant: {
          _id: colorVariants._id,
          color: colorVariants.color,
          image: colorVariants.image,
        },
      }
    ),
};

export default OrderApi;
