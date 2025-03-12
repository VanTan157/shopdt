import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./entities/order.entity";
import { OrderItemsModule } from "src/order-items/order-items.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    OrderItemsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
