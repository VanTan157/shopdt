import { Transform } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty, IsMongoId } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value)) // Chuyển chuỗi thành số
  @IsNumber({}, { message: "price must be a number" })
  price: number;

  @IsString()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  product_type_id: string;
}
