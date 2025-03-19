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

    const promotion = createProductDto.promotion ?? 0;
    const IsPromotion = promotion > 0;

    const finalPrice =
      createProductDto.StartingPrice -
      promotion * createProductDto.StartingPrice;

    const productData = {
      ...createProductDto,
      finalPrice,
      promotion,
      IsPromotion,
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }

    // Tìm sản phẩm và populate product_type_id
    const product = await this.productModel.findById({ _id: id }).exec();

    if (!product) {
      throw new NotFoundException("Không tìm thấy Product");
    }

    // Lấy giá trị từ DTO, nếu undefined thì giữ nguyên giá trị cũ
    const startingPrice =
      updateProductDto.StartingPrice !== undefined
        ? updateProductDto.StartingPrice
        : product.StartingPrice;
    const promotion =
      updateProductDto.promotion !== undefined
        ? updateProductDto.promotion
        : product.promotion;

    // Xác định IsPromotion: ưu tiên giá trị từ DTO, nếu không có thì dựa vào promotion
    const isPromotion = promotion > 0;

    // Tính finalPrice
    const finalPrice = startingPrice - promotion * startingPrice;

    // Cập nhật các trường của product
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(
        { _id: id },
        {
          ...updateProductDto,
          finalPrice,
          IsPromotion: isPromotion,
          StartingPrice: startingPrice,
          promotion,
        },
        { new: true }
      )
      .exec();

    return updatedProduct;
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
