import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value)) // Chuyển chuỗi thành số
  @IsNumber()
  StartingPrice: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value)) // Chuyển chuỗi thành số
  @IsNumber()
  promotion: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsMongoId()
  @IsOptional()
  product_type_id: string;
}
