import { z } from "zod";

// Schema cho MobileType
const MobileTypeSchema = z.object({
  _id: z.string(),
  type: z.string(),
});

// Schema cho Specifications
const SpecificationsSchema = z.object({
  screenSize: z.number().optional(),
  resolution: z.string().optional(),
  cpu: z.string().optional(),
  ram: z.number().optional(),
  storage: z.number().optional(),
  battery: z.number().optional(),
  os: z.string().optional(),
});

// Schema cho Camera
const CameraSchema = z.object({
  rear: z.string().optional(),
  front: z.string().optional(),
});

// Schema cho ColorVariant
export const ColorVariantSchema = z.object({
  _id: z.string(),
  color: z.string(),
  image: z.string(),
});

export type ColorVariantType = z.infer<typeof ColorVariantSchema>;

// Schema chính cho Mobile
export const Mobile = z.object({
  _id: z.string(),
  name: z.string(),
  StartingPrice: z.number(),
  promotion: z.number(),
  finalPrice: z.number(),
  IsPromotion: z.boolean(),
  description: z.string().optional(), // description không bắt buộc trong schema Mongoose
  mobile_type_id: MobileTypeSchema,
  specifications: SpecificationsSchema.optional(),
  colorVariants: z.array(ColorVariantSchema).default([]), // Mảng colorVariants, mặc định rỗng
  stock: z.number().default(0), // Mặc định 0 như trong schema Mongoose
  isAvailable: z.boolean().default(true), // Mặc định true như trong schema Mongoose
  camera: CameraSchema.optional(),
  weight: z.number().optional(),
  tags: z.array(z.string()).default([]), // Mảng tags, mặc định rỗng
  createdAt: z.string().optional(), // Từ timestamps: true
  updatedAt: z.string().optional(), // Từ timestamps: true
});

// TypeScript type tương ứng (nếu cần)
export type MobileType = z.infer<typeof Mobile>;
