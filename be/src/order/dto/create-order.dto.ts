// order/dto/create-order.dto.ts
import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true }) // Mỗi phần tử trong mảng là string
  orderitem_ids: string[]; // Mảng ID của OrderItem

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  status?: string; // Tùy chọn, sẽ dùng default nếu không cung cấp
}
