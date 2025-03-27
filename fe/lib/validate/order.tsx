import { z } from "zod";
import { ColorVariantSchema, Mobile } from "./mobile";

export const OrderItemMobile = z.object({
  _id: z.string(),
  user_id: z.string(),
  mobile_id: Mobile, // Sau khi populate, mobile_id sẽ là object Mobile
  quantity: z.number(),
  unit_price: z.number(),
  total_price: z.number(),
  colorVariant: ColorVariantSchema, // Thêm trường colorVariant
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type OrderItemMobileType = z.infer<typeof OrderItemMobile>;

export const OrderMobileSchema = z.object({
  _id: z.string(),
  user_id: z.string(),
  orderitem_ids: z.array(OrderItemMobile), // Mảng các OrderItem
  total_amount: z.number().min(0, "Tổng tiền phải lớn hơn hoặc bằng 0"),
  phone_number: z.string().min(1, "Số điện thoại không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  status: z.enum(
    [
      "Đang chờ xác nhận",
      "Đã xác nhận",
      "Đang vận chuyển",
      "Hoàn thành",
      "Đã hủy",
    ],
    {
      errorMap: () => ({ message: "Trạng thái không hợp lệ" }),
    }
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type OrderMobileType = z.infer<typeof OrderMobileSchema>;

export const cartCreateMobile = z.object({
  _id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  unit_price: z.number(),
  total_price: z.number(),
});

export type CartCeateMobileType = z.infer<typeof cartCreateMobile>;
