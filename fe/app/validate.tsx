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

export const Product = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  product_type: z.object({
    _id: z.string(),
    type: z.string(),
  }),
});
export type ProductType = z.infer<typeof Product>;

export const ProductT = z.object({
  _id: z.string(),
  type: z.string(),
});
export type ProductTType = z.infer<typeof ProductT>;

export const account = z.object({
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  type: z.string(),
});
export type AccountType = z.infer<typeof account>;

export const cart = z.object({
  _id: z.string(),
  user_id: z.string(),
  product_id: z.object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string(),
    product_type_id: z.string(),
  }),
  quantity: z.number(),
  unit_price: z.number(),
  total_price: z.number(),
});
export type CartType = z.infer<typeof cart>;

//  _id: '67d1e4d391613eb7be50a9fb',
//     user_id: '67cde7e68ebf870e2d71625a',
//     orderitem_ids: [ '67d1e479f9d1b06c51ad1b58', '67d1e489f9d1b06c51ad1b5d' ],
//     total_amount: 740736,
//     phone_number: '0123456789',
//     address: '123 Đường ABC, Quận 1, TP.HCM',
//     status: 'Đang chờ xác nhận',
