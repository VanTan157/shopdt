"use client";

import { z } from "zod";

export const login = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginType = z.infer<typeof login>;

export const resLogin = z.object({
  message: z.string(),
  user: z.object({
    email: z.string(),
    name: z.string(),
  }),
});
export type LoginResType = z.infer<typeof resLogin>;

export const register = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterType = z.infer<typeof register>;

export const resRegister = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});
export type RegisterResType = z.infer<typeof resRegister>;

export const Mobile = z.object({
  _id: z.string(),
  name: z.string(),
  StartingPrice: z.number(),
  promotion: z.number(),
  finalPrice: z.number(),
  IsPromotion: z.boolean(),
  description: z.string(),
  image: z.string(),
  mobile_type_id: z.object({
    _id: z.string(),
    type: z.string(),
  }),
});
export type MobileType = z.infer<typeof Mobile>;

export const MobileT = z.object({
  _id: z.string(),
  type: z.string(),
});
export type MobileTType = z.infer<typeof MobileT>;

export const account = z.object({
  _id: z.string(),
  email: z.string(),
  name: z.string(),
  type: z.string(),
});
export type AccountType = z.infer<typeof account>;

export const cart = z.object({
  _id: z.string(),
  user_id: z.string(),
  mobile_id: z.object({
    _id: z.string(),
    name: z.string(),
    StartingPrice: z.number(),
    promotion: z.number(),
    finalPrice: z.number(),
    IsPromotion: z.boolean(),
    description: z.string(),
    image: z.string(),
    product_type_id: z.string(),
  }),
  quantity: z.number(),
  unit_price: z.number(),
  total_price: z.number(),
});
export type CartType = z.infer<typeof cart>;

export const cartCreate = z.object({
  _id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  unit_price: z.number(),
  total_price: z.number(),
});
export type CartCreateType = z.infer<typeof cartCreate>;

export const order = z.object({
  _id: z.string(),
  user_id: z.string(),
  orderitem_ids: z.array(cart),
  total_amount: z.number(),
  phone_number: z.number(),
  address: z.string(),
  status: z.string(),
  createdAt: z.string(),
});
export type OrderType = z.infer<typeof order>;
