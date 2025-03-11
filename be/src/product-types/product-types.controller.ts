import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
} from "@nestjs/common";
import { ProductTypesService } from "./product-types.service";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("product-types")
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN") // Chỉ ADMIN tạo được
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypesService.create(createProductTypeDto);
  }

  @Get()
  findAll() {
    return this.productTypesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productTypesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body("type") type: string) {
    return this.productTypesService.update(id, type);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productTypesService.remove(id);
  }
}
