import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class OrderItem extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Product", required: true })
  product_id: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true })
  unit_price: number;

  @Prop({ required: true })
  total_price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
