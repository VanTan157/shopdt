import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
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

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: "MobileType", required: true }) // Thay ProductType thành MobileType
  mobile_type_id: Types.ObjectId; // Thay product_type_id thành mobile_type_id
}

export const MobileSchema = SchemaFactory.createForClass(Mobile);
