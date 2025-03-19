import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ProductType extends Document {
  @Prop({ required: true, unique: true })
  type: string; // "iphone", "samsung", ...
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
