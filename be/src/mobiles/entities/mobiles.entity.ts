import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true }) // Thêm createdAt và updatedAt
export class Mobile extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  StartingPrice: number;

  @Prop({ required: true, default: 0 })
  promotion: number;

  @Prop({ required: true, default: false })
  IsPromotion: boolean;

  @Prop({ required: true })
  finalPrice: number;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: "MobileType", required: true })
  mobile_type_id: Types.ObjectId;

  @Prop({ type: Object })
  specifications: {
    screenSize?: number; // inch Kích thước màn hình
    resolution?: string; // "2796 x 1290" Độ phân giải màn hình
    cpu?: string; // "Apple A16 Bionic"
    ram?: number; // GB
    storage?: number; // GB Dung lượng lưu trữ
    battery?: number; // mAh Dung lượng pin
    os?: string; // "iOS 16" Hệ điều hành
  };

  @Prop({
    type: [
      {
        color: { type: String, required: true }, // Tên màu
        image: { type: String, required: true }, // Ảnh tương ứng
      },
    ],
    default: [],
  })
  colorVariants: { color: string; image: string }[];

  @Prop({ type: Number, default: 0 })
  stock: number; //số lượng

  @Prop({ type: Boolean, default: true })
  isAvailable: boolean; //trạng thái

  @Prop({ type: Object })
  camera: {
    rear?: string; // "48MP + 12MP"
    front?: string; // "12MP"
  };

  @Prop({ type: Number })
  weight: number; // gram

  @Prop({ type: [String], default: [] })
  tags: string[]; // ["smartphone", "5G"]
}

export const MobileSchema = SchemaFactory.createForClass(Mobile);
