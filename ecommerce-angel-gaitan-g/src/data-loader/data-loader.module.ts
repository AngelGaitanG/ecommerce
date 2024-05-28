import { Module } from '@nestjs/common';
import { DataLoaderService } from './data-loader.service';

import { ProductsService } from 'src/products/products.service';
import { CategoryService } from 'src/category/category.service';
import { Product } from 'src/products/product.entity';
import { Category } from 'src/category/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],	
  providers: [DataLoaderService, ProductsService, CategoryService],
})
export class DataLoaderModule {}
