import { IsString, IsNotEmpty } from "class-validator";

export class CreateProductTypeDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
