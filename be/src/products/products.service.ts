import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductTypesService } from "src/product-types/product-types.service";
import { Product } from "./entities/product.entity";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private productTypesService: ProductTypesService
  ) {}

  async create(
    createProductDto: CreateProductDto,
    file?: Express.Multer.File
  ): Promise<Product> {
    // Kiểm tra product_type_id có tồn tại không
    const productType = await this.productTypesService.findOne(
      createProductDto.product_type_id
    );
    if (!productType) {
      throw new NotFoundException("Product type không tồn tại");
    }

    const productData = {
      ...createProductDto,
      image: file ? `/image/${file.filename}` : undefined, // Lưu đường dẫn tương đối
    };
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate("product_type_id").exec(); // Populate để lấy thông tin ProductType
  }

  async findOne(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const product = await this.productModel
      .findById(id)
      .populate("product_type_id")
      .exec();
    if (!product) {
      throw new NotFoundException("Product không tồn tại");
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const Product = await this.productModel
      .findByIdAndUpdate({ _id: id }, { $set: updateProductDto }, { new: true })
      .exec();
    if (!Product) {
      throw new Error("Không tìm thấy Product");
    }
    return Product;
  }

  async remove(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const Product = await this.productModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!Product) {
      throw new Error("Không tìm thấy Product");
    }
    return Product;
  }
  async findByProductType(productTypeId: string): Promise<Product[]> {
    if (!Types.ObjectId.isValid(productTypeId)) {
      throw new NotFoundException("Product type ID không hợp lệ");
    }

    // Kiểm tra xem product_type_id có tồn tại không
    const productType = await this.productTypesService.findOne(productTypeId);
    if (!productType) {
      throw new NotFoundException("Product type không tồn tại");
    }

    // Lấy danh sách sản phẩm theo product_type_id
    const products = await this.productModel
      .find({ product_type_id: productTypeId })
      .populate("product_type_id")
      .exec();

    return products;
  }
}
