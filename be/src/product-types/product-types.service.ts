import { Product } from "./../products/entities/product.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { ProductType } from "./entities/product-type.entity";

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectModel(ProductType.name) private productTypeModel: Model<ProductType>
  ) {}

  async create(
    createProductTypeDto: CreateProductTypeDto
  ): Promise<ProductType> {
    const newProductType = new this.productTypeModel(createProductTypeDto);
    return newProductType.save();
  }

  async findAll(): Promise<ProductType[]> {
    return this.productTypeModel.find().exec();
  }

  async findOne(id: string): Promise<ProductType> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const ProductType = await this.productTypeModel
      .findById({ _id: id })
      .exec();
    if (!ProductType) {
      throw new Error("Không tìm thấy Product Type");
    }
    return ProductType;
  }

  async update(id: string, type: string): Promise<ProductType> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const ProductType = await this.productTypeModel
      .findByIdAndUpdate({ _id: id }, { type }, { new: true })
      .exec();
    if (!ProductType) {
      throw new Error("Không tìm thấy ProductType");
    }
    return ProductType;
  }

  async remove(id: string): Promise<ProductType> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const ProductType = await this.productTypeModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!ProductType) {
      throw new Error("Không tìm thấy Product");
    }
    return ProductType;
  }
}
