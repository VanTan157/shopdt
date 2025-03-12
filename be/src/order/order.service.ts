import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./entities/order.entity";
import { Model, Types } from "mongoose";
import { OrderItemsService } from "src/order-items/order-items.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private orderItemsService: OrderItemsService
  ) {}
  async create(createOrderDto: CreateOrderDto, userId) {
    const { orderitem_ids, phone_number, address, status } = createOrderDto;
    const orderItems = await Promise.all(
      orderitem_ids.map(async (id) => {
        if (!Types.ObjectId.isValid(id)) {
          throw new NotFoundException(`Invalid OrderItem ID: ${id}`);
        }
        const item = await this.orderItemsService.findOne(id);
        if (!item) {
          throw new NotFoundException(`OrderItem not found: ${id}`);
        }
        return item;
      })
    );

    const total_amount = orderItems.reduce(
      (sum, item) => sum + item.total_price,
      0
    );

    // Tạo Order
    const order = new this.orderModel({
      user_id: userId,
      orderitem_ids: orderitem_ids.map((id) => new Types.ObjectId(id)),
      total_amount,
      phone_number,
      address,
      status: status || "Đang chờ xác nhận", // Dùng mặc định nếu không cung cấp
    });

    return order.save();
  }

  async findAll() {
    return this.orderModel.find().populate("orderitem_ids").exec();
  }

  async findOne(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid OrderItem ID: ${id}`);
    }
    const order = await this.orderModel
      .findById(id)
      .populate({
        path: "orderitem_ids",
        model: "OrderItem", // Rõ ràng chỉ định model
      })
      .exec();
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid OrderItem ID: ${id}`);
    }
    const order = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .populate("orderitem_ids")
      .exec();
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }

  async remove(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid OrderItem ID: ${id}`);
    }
    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }

  async getByUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid OrderItem ID: ${id}`);
    }
    const order = await this.orderModel
      .find({ user_id: id })
      .populate({
        path: "orderitem_ids",
        model: "OrderItem", // Rõ ràng chỉ định model
      })
      .exec();
    if (!order.length) {
      throw new NotFoundException("No orders found for this user");
    }
    return order;
  }
}
