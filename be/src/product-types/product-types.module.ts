import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductTypesService } from "./product-types.service";
import { ProductTypesController } from "./product-types.controller";
import { ProductType, ProductTypeSchema } from "./entities/product-type.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
  ],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  exports: [ProductTypesService], // Export để dùng trong ProductModule
})
export class ProductTypesModule {}
