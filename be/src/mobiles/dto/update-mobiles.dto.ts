import {
  IsString,
  IsNumber,
  IsMongoId,
  IsArray,
  IsObject,
  IsOptional,
} from "class-validator";

export class UpdateMobileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  StartingPrice?: number;

  @IsNumber()
  @IsOptional()
  promotion?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsOptional()
  mobile_type_id?: string;

  @IsObject()
  @IsOptional()
  specifications?: {
    screenSize?: number;
    resolution?: string;
    cpu?: string;
    ram?: number;
    storage?: number;
    battery?: number;
    os?: string;
  };

  @IsArray()
  @IsObject({ each: true })
  @IsOptional()
  colorVariants?: { color: string; image?: string }[];

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsObject()
  @IsOptional()
  camera?: {
    rear?: string;
    front?: string;
  };

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
