import { z } from "zod";
import { ColorVariantSchema, Mobile } from "./mobile";

export const OrderItem = z.object({
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

export type OrderItemType = z.infer<typeof OrderItem>;
