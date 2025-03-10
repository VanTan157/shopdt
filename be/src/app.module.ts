import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./products/products.module";
import { ProductTypesModule } from './product-types/product-types.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/nestjs_db"),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    ProductTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
