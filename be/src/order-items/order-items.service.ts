import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { OrderItem } from "./entities/order-item.entity";
import { ProductsService } from "src/products/products.service";
import { OrderService } from "src/order/order.service";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>,
    private productsService: ProductsService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService
  ) {}

  async getOrderNotInCart(userId: string) {
    const order = await this.orderService.getByUser(userId);
    if (!order) {
      return [];
    }
    const usedOrderItemIds = order.flatMap((order) =>
      order.orderitem_ids.map((item) => item._id)
    );
    return this.orderItemModel
      .find({ user_id: userId, _id: { $nin: usedOrderItemIds } })
      .populate("product_id")
      .exec();
  }

  async create(createOrderItemDto: CreateOrderItemDto, userId) {
    const { product_id, quantity } = createOrderItemDto;
    if (!Types.ObjectId.isValid(product_id)) {
      throw new NotFoundException("Id sản phẩm không hợp lệ");
    }

    const product = await this.productsService.findOne(product_id); // Sửa chính tả
    if (!product) {
      throw new NotFoundException("Không tìm thấy sản phẩm");
    }

    const total_price = quantity * product.finalPrice;

    const orderItem = new this.orderItemModel({
      user_id: userId,
      product_id,
      quantity,
      unit_price: product.finalPrice,
      total_price,
    });

    return orderItem.save();
  }

  async findAll() {
    return this.orderItemModel.find().populate("product_id").exec();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Id không hợp lệ");
    }
    const orderItem = await this.orderItemModel
      .findById(id)
      .populate("product_id")
      .exec();
    if (!orderItem) throw new NotFoundException("OrderItem not found");
    return orderItem;
  }

  async findByUserId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Id không hợp lệ");
    }
    const orderItem = await this.orderItemModel
      .find({ user_id: id })
      .populate("product_id")
      .exec();
    if (!orderItem) throw new NotFoundException("User not found");
    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const { product_id, quantity } = updateOrderItemDto;
    if (!Types.ObjectId.isValid(product_id)) {
      throw new NotFoundException("Id sản phẩm không hợp lệ");
    }

    const product = await this.productsService.findOne(product_id); // Sửa chính tả
    if (!product) {
      throw new NotFoundException("Không tìm thấy sản phẩm");
    }

    const total_price = quantity * product.finalPrice;
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Id không hợp lệ");
    }
    const orderItem = await this.orderItemModel
      .findByIdAndUpdate(
        id,
        { ...updateOrderItemDto, total_price },
        { new: true }
      )
      .populate("product_id")
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
