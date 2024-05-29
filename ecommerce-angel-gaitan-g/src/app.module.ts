import { MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { CategoryModule } from './category/category.module';
import typeOrmConfig from './config/typeorm'
import { DataLoaderService } from './data-loader/data-loader.service';
import { CategoryService } from './category/category.service';
import { ProductsService } from './products/products.service';
import { Category } from './category/category.entity';
import { OrderDetail } from './order/order-detail.entity';
import { Order } from './order/order.entity';
import { Product } from './products/product.entity';
import { User } from './users/user.entity';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')
    }),
    TypeOrmModule.forFeature([User, Product, Order, OrderDetail, Category]),
    ProductsModule, UsersModule, AuthModule, OrderModule, DataLoaderModule, CategoryModule, FilesModule],
  controllers: [AppController],
  providers: [AppService, DataLoaderService, CategoryService, ProductsService],
})

export class AppModule implements  NestModule {
  constructor() {}



  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
