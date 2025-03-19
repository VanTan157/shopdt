import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class MobileType extends Document {
  // Thay ProductType
  @Prop({ required: true, unique: true })
  type: string; // "iphone", "samsung", ...
}

export const MobileTypeSchema = SchemaFactory.createForClass(MobileType); // Thay ProductTypeSchema
