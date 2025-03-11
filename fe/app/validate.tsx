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
