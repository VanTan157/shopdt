import { forwardRef, Module } from "@nestjs/common";
import { OrderItemsService } from "./order-items.service";
import { OrderItemsController } from "./order-items.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderItem, OrderItemSchema } from "./entities/order-item.entity";
import { ProductsModule } from "src/products/products.module";
import { OrderModule } from "src/order/order.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
    ProductsModule,
    forwardRef(() => OrderModule),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService], // Đã export OrderItemsService
})
export class OrderItemsModule {}
