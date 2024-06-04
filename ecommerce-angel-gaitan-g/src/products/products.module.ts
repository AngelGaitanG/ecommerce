import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
import { CategoryService } from 'src/category/category.service';



@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, Category])],
    controllers: [ProductsController],
    providers: [ProductsService, DataLoaderService, CategoryService]
})
export class ProductsModule {}
