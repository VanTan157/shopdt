import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import * as fs from "fs"; // Import fs để xóa file
import { promisify } from "util";

import { CreateMobileDto } from "./dto/create-mobiles.dto";
import { UpdateMobileDto } from "./dto/update-mobiles.dto";
import { Mobile } from "./entities/mobiles.entity";
import { MobilesService } from "./mobiles.service";

const unlinkAsync = promisify(fs.unlink); // Chuyển fs.unlink thành Promise

@Controller("mobiles")
export class MobilesController {
  constructor(private readonly mobilesService: MobilesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./image",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const ext = allowedTypes.test(extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);
        if (ext && mime) {
          cb(null, true);
        } else {
          cb(new Error("Chỉ chấp nhận file ảnh (jpg, png, gif)"), false);
        }
      },
    })
  )
  async create(
    @Body() createMobileDto: CreateMobileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const mobile = await this.mobilesService.create(createMobileDto, file);
      return mobile;
    } catch (error) {
      // Nếu tạo không thành công và có file, xóa file đã upload
      if (file) {
        const filePath = `./image/${file.filename}`;
        await unlinkAsync(filePath).catch((err) =>
          console.error("Không thể xóa file ảnh:", err)
        );
      }
      throw error; // Ném lại lỗi để client nhận được
    }
  }

  @Get()
  findAll() {
    return this.mobilesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mobilesService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./image",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const ext = allowedTypes.test(extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);
        if (ext && mime) {
          cb(null, true);
        } else {
          cb(new Error("Chỉ chấp nhận file ảnh (jpg, png, gif)"), false);
        }
      },
    })
  )
  update(
    @Param("id") id: string,
    @Body() updateMobileDto: UpdateMobileDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.mobilesService.update(id, updateMobileDto, file);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN")
  remove(@Param("id") id: string) {
    return this.mobilesService.remove(id);
  }

  @Get("type/:mobileTypeId")
  async findByMobileType(
    @Param("mobileTypeId") mobileTypeId: string
  ): Promise<Mobile[]> {
    return this.mobilesService.findByMobileType(mobileTypeId);
  }
}
