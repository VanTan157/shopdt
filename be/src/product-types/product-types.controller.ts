import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { ProductTypesService } from "./product-types.service";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("product-types")
@UseGuards(AuthGuard) // Yêu cầu đăng nhập
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  @UseGuards(RolesGuard)
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
}
