import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user_id: Types.ObjectId; // Liên kết với User

  @Prop([{ type: Types.ObjectId, ref: "OrderItem", required: true }])
  orderitem_ids: Types.ObjectId[];

  @Prop({ required: true })
  total_amount: number;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    required: true,
    enum: [
      "Đang chờ xác nhận",
      "Đã xác nhận",
      "Đang vận chuyển",
      "Hoàn thành",
      "Đã hủy",
    ], // Các trạng thái đơn hàng
    default: "Đang chờ xác nhận",
  })
  status: string; // Trạng thái đơn hàng
}

export const OrderSchema = SchemaFactory.createForClass(Order);
