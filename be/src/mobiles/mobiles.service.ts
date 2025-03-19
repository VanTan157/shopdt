import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { MobileTypesService } from "src/mobile-types/mobile-types.service";
import { Mobile } from "./entities/mobiles.entity";
import { CreateMobileDto } from "./dto/create-mobiles.dto";
import { UpdateMobileDto } from "./dto/update-mobiles.dto";

@Injectable()
export class MobilesService {
  constructor(
    @InjectModel(Mobile.name) private mobileModel: Model<Mobile>,
    private mobileTypesService: MobileTypesService
  ) {}

  async create(
    createMobileDto: CreateMobileDto,
    file?: Express.Multer.File
  ): Promise<Mobile> {
    const mobileType = await this.mobileTypesService.findOne(
      createMobileDto.mobile_type_id
    );
    if (!mobileType) {
      throw new NotFoundException("Mobile type không tồn tại");
    }

    const promotion = createMobileDto.promotion ?? 0;
    const IsPromotion = promotion > 0;

    const finalPrice =
      createMobileDto.StartingPrice -
      (promotion * createMobileDto.StartingPrice) / 100;

    const mobileData = {
      ...createMobileDto,
      finalPrice,
      promotion,
      IsPromotion,
      image: file ? `/image/${file.filename}` : undefined,
    };

    const newMobile = new this.mobileModel(mobileData);
    return newMobile.save();
  }

  async findAll(): Promise<Mobile[]> {
    return this.mobileModel.find().populate("mobile_type_id").exec();
  }

  async findOne(id: string): Promise<Mobile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const mobile = await this.mobileModel
      .findById(id)
      .populate("mobile_type_id")
      .exec();
    if (!mobile) {
      throw new NotFoundException("Mobile không tồn tại");
    }
    return mobile;
  }

  async update(id: string, updateMobileDto: UpdateMobileDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }

    const mobile = await this.mobileModel.findById({ _id: id }).exec();
    if (!mobile) {
      throw new NotFoundException("Không tìm thấy Mobile");
    }

    const startingPrice =
      updateMobileDto.StartingPrice !== undefined
        ? updateMobileDto.StartingPrice
        : mobile.StartingPrice;
    const promotion =
      updateMobileDto.promotion !== undefined
        ? updateMobileDto.promotion
        : mobile.promotion;

    const isPromotion = promotion > 0;

    const finalPrice = startingPrice - (promotion * startingPrice) / 100;

    const updatedMobile = await this.mobileModel
      .findByIdAndUpdate(
        { _id: id },
        {
          ...updateMobileDto,
          finalPrice,
          IsPromotion: isPromotion,
          StartingPrice: startingPrice,
          promotion,
        },
        { new: true }
      )
      .exec();

    return updatedMobile;
  }

  async remove(id: string): Promise<Mobile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    const mobile = await this.mobileModel.findByIdAndDelete({ _id: id }).exec();
    if (!mobile) {
      throw new Error("Không tìm thấy Mobile");
    }
    return mobile;
  }

  async findByMobileType(mobileTypeId: string): Promise<Mobile[]> {
    if (!Types.ObjectId.isValid(mobileTypeId)) {
      throw new NotFoundException("Mobile type ID không hợp lệ");
    }

    const mobileType = await this.mobileTypesService.findOne(mobileTypeId);
    if (!mobileType) {
      throw new NotFoundException("Mobile type không tồn tại");
    }

    const mobiles = await this.mobileModel
      .find({ mobile_type_id: mobileTypeId })
      .populate("mobile_type_id")
      .exec();

    return mobiles;
  }
}
