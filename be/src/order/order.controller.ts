import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Request } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

interface User {
  userId: string;
  email: string;
  type: string;
  name: string;
}

@Controller("order")
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const userId = (req.user as User).userId;
    return this.orderService.create(createOrderDto, userId);
  }

  @Get("find-by-user")
  findByUser(@Req() req: Request) {
    const userId = (req.user as User).userId;
    return this.orderService.getByUser(userId);
  }

  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderService.remove(id);
  }
}
