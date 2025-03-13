import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./entities/order.entity";
import { Model, Types } from "mongoose";
import { OrderItemsService } from "src/order-items/order-items.service";
import { ProductsService } from "src/products/products.service";
import { OrderItem } from "src/order-items/entities/order-item.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject(forwardRef(() => OrderItemsService))
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

  // async createBuyNow(
  //   userId: string,
  //   product_id: string,
  //   quantity: number,
  //   phone_number: string,
  //   address: string
  // ): Promise<Order> {
  //   const product = await this.productsService.findOne(product_id);
  //   if (!product) {
  //     throw new NotFoundException(`Product not found: ${product_id}`);
  //   }

  //   const total_price = product.price * quantity;
  //   const tempOrderItem = new this.orderItemModel({
  //     user_id: userId,
  //     product_id,
  //     quantity,
  //     unit_price: product.price,
  //     total_price,
  //   });

  //   // Định kiểu rõ ràng cho savedOrderItem
  //   const savedOrderItem: OrderItem = await tempOrderItem.save();

  //   const order = new this.orderModel({
  //     user_id: userId,
  //     orderitem_ids: [(savedOrderItem as any)._id],
  //     total_amount: total_price,
  //     phone_number,
  //     address,
  //     status: "Đang chờ xác nhận",
  //   });

  //   const savedOrder = await order.save();

  //   // Bây giờ TypeScript biết savedOrderItem._id là Types.ObjectId
  //   await this.orderItemsService.remove(savedOrderItem._id.toString());

  //   return savedOrder;
  // }

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
        model: "OrderItem", // Populate OrderItem
        populate: {
          path: "product_id", // Populate product_id trong OrderItem
          model: "Product", // Rõ ràng chỉ định model Product
        },
      })
      .exec();
    if (!order.length) {
      throw new NotFoundException("No orders found for this user");
    }
    return order;
  }

  async getByStatus(userId: string, status: string): Promise<Order[]> {
    // Validate status against allowed values
    const validStatuses = [
      "Đang chờ xác nhận",
      "Đã xác nhận",
      "Đang vận chuyển",
      "Hoàn thành",
      "Đã hủy",
    ];

    if (status && !validStatuses.includes(status)) {
      throw new Error("Invalid status value");
    }

    const query: any = { user_id: userId };
    if (status) {
      query.status = status;
    }

    return this.orderModel
      .find(query)
      .populate({
        path: "orderitem_ids",
        model: "OrderItem", // Populate OrderItem
        populate: {
          path: "product_id", // Populate product_id trong OrderItem
          model: "Product", // Rõ ràng chỉ định model Product
        },
      }) // Optional: populate order items if needed
      .exec();
  }
}
