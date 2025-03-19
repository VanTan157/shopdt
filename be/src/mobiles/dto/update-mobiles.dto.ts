import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateMobileDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  StartingPrice: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
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
  mobile_type_id: string; // Thay product_type_id thành mobile_type_id
}
