import { Transform } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsMongoId,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value)) // Chuyển chuỗi thành số
  @IsNumber()
  StartingPrice: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  promotion: number;

  @IsBoolean()
  @IsOptional()
  IsPromotion?: boolean;

  @IsString()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  product_type_id: string;
}
