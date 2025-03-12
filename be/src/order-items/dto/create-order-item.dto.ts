import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10)) // Chuyển chuỗi thành số nguyên
  @IsNumber({}, { message: "quantity must be a number" })
  @Min(1, { message: "quantity must be at least 1" })
  quantity: number;
}
