import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { OrderItem } from "./entities/order-item.entity";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>,
    private productsService: ProductsService
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const { product_id, quantity } = createOrderItemDto;
    if (!Types.ObjectId.isValid(product_id)) {
      throw new NotFoundException("Id sản phẩm không hợp lệ");
    }

    const product = await this.productsService.findOne(product_id); // Sửa chính tả
    if (!product) {
      throw new NotFoundException("Không tìm thấy sản phẩm");
    }

    const total_price = quantity * product.price;

    const orderItem = new this.orderItemModel({
      product_id,
      quantity,
      unit_price: product.price,
      total_price,
    });

    return orderItem.save();
  }

  async findAll() {
    return await this.orderItemModel.find().exec();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Id không hợp lệ");
    }
    const orderItem = await this.orderItemModel.findById(id).exec();
    if (!orderItem) throw new NotFoundException("OrderItem not found");
    return orderItem;
  }

  async findByUserId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Id không hợp lệ");
    }
    const orderItem = await this.orderItemModel.findOne({ user_id: id }).exec();
    if (!orderItem) throw new NotFoundException("User not found");
    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Id không hợp lệ");
    }
    const orderItem = await this.orderItemModel
      .findByIdAndUpdate(id, updateOrderItemDto, { new: true })
      .exec();
    if (!orderItem) throw new NotFoundException("OrderItem not found");
    return orderItem;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Id không hợp lệ");
    }
    const orderItem = await this.orderItemModel.findByIdAndDelete(id).exec();
    if (!orderItem) throw new NotFoundException("OrderItem not found");
    return orderItem;
  }
}
