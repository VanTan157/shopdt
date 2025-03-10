import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: "ProductType", required: true })
  product_type_id: Types.ObjectId; // Liên kết với ProductType
}

export const ProductSchema = SchemaFactory.createForClass(Product);
