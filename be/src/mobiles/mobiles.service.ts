import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { MobileTypesService } from "src/mobile-types/mobile-types.service";
import { Mobile } from "./entities/mobiles.entity";
import { CreateMobileDto } from "./dto/create-mobiles.dto";
import { UpdateMobileDto } from "./dto/update-mobiles.dto";
import * as fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class MobilesService {
  constructor(
    @InjectModel(Mobile.name) private mobileModel: Model<Mobile>,
    private mobileTypesService: MobileTypesService
  ) {}

  async create(
    createMobileDto: CreateMobileDto,
    files: Express.Multer.File[]
  ): Promise<Mobile> {
    const mobileType = await this.mobileTypesService.findOne(
      createMobileDto.mobile_type_id
    );
    if (!mobileType) throw new NotFoundException("Mobile type không tồn tại");

    const promotion = createMobileDto.promotion ?? 0;
    const IsPromotion = promotion > 0;
    const finalPrice =
      createMobileDto.StartingPrice -
      (promotion * createMobileDto.StartingPrice) / 100;

    const colorVariants = createMobileDto.colorVariants.map(
      (variant, index) => {
        if (!files[index])
          throw new NotFoundException(`Thiếu ảnh cho màu ${variant.color}`);
        return {
          color: variant.color,
          image: `/image/${files[index].filename}`,
        };
      }
    );

    const mobileData = {
      ...createMobileDto,
      finalPrice,
      promotion,
      IsPromotion,
      colorVariants,
      stock: createMobileDto.stock ?? 0,
      isAvailable:
        createMobileDto.stock !== undefined ? createMobileDto.stock > 0 : true,
    };

    const newMobile = new this.mobileModel(mobileData);
    try {
      return await newMobile.save();
    } catch (error) {
      await Promise.all(
        colorVariants.map((variant) =>
          unlinkAsync(`.${variant.image}`).catch((err) =>
            console.error("Không thể xóa file:", err)
          )
        )
      );
      throw error;
    }
  }

  async findAll(): Promise<Mobile[]> {
    return this.mobileModel.find().populate("mobile_type_id").exec();
  }

  async findOne(id: string): Promise<Mobile> {
    if (!Types.ObjectId.isValid(id)) throw new Error("ID không hợp lệ");
    const mobile = await this.mobileModel
      .findById(id)
      .populate("mobile_type_id")
      .exec();
    if (!mobile) throw new NotFoundException("Mobile không tồn tại");
    return mobile;
  }

  async update(
    id: string,
    updateMobileDto: UpdateMobileDto,
    files?: Express.Multer.File[]
  ) {
    if (!Types.ObjectId.isValid(id)) throw new Error("ID không hợp lệ");

    const mobile = await this.mobileModel.findById(id).exec();
    if (!mobile) throw new NotFoundException("Không tìm thấy Mobile");

    const startingPrice = updateMobileDto.StartingPrice ?? mobile.StartingPrice;
    const promotion = updateMobileDto.promotion ?? mobile.promotion;
    const finalPrice = startingPrice - (promotion * startingPrice) / 100;

    let colorVariants = mobile.colorVariants;
    if (updateMobileDto.colorVariants && files) {
      const oldImagesToDelete = mobile.colorVariants.filter((oldVariant) =>
        updateMobileDto?.colorVariants?.some(
          (newVariant, idx) =>
            newVariant.color === oldVariant.color && files[idx]
        )
      );
      await Promise.all(
        oldImagesToDelete.map((variant) =>
          unlinkAsync(`.${variant.image}`).catch((err) =>
            console.error("Không thể xóa ảnh cũ:", err)
          )
        )
      );

      colorVariants = updateMobileDto.colorVariants.map((variant, index) => ({
        color: variant.color,
        image: files[index]
          ? `/image/${files[index].filename}`
          : mobile.colorVariants.find((v) => v.color === variant.color)
              ?.image || "",
      }));
    }

    const updatedMobile = await this.mobileModel
      .findByIdAndUpdate(
        id,
        {
          ...updateMobileDto,
          finalPrice,
          IsPromotion: promotion > 0,
          StartingPrice: startingPrice,
          promotion,
          colorVariants,
          stock: updateMobileDto.stock ?? mobile.stock,
          isAvailable:
            updateMobileDto.stock !== undefined
              ? updateMobileDto.stock > 0
              : mobile.isAvailable,
        },
        { new: true }
      )
      .exec();

    return updatedMobile;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error("ID không hợp lệ");

    const mobile = await this.mobileModel.findById(id).exec();
    if (!mobile) throw new NotFoundException("Không tìm thấy Mobile");

    await Promise.all(
      mobile.colorVariants.map((variant) =>
        unlinkAsync(`.${variant.image}`).catch((err) =>
          console.error("Không thể xóa ảnh:", err)
        )
      )
    );

    return this.mobileModel.findByIdAndDelete(id).exec();
  }

  async findByMobileType(mobileTypeId: string): Promise<Mobile[]> {
    if (!Types.ObjectId.isValid(mobileTypeId))
      throw new NotFoundException("Mobile type ID không hợp lệ");
    const mobileType = await this.mobileTypesService.findOne(mobileTypeId);
    if (!mobileType) throw new NotFoundException("Mobile type không tồn tại");
    return this.mobileModel
      .find({ mobile_type_id: mobileTypeId })
      .populate("mobile_type_id")
      .exec();
  }
}
