import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoryService, DataLoaderService, ProductsService],
  controllers: [CategoryController]
})
export class CategoryModule {}
