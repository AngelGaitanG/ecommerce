import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';
import { Category } from 'src/category/category.entity';



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async getAllProducts(page: number, limit: number) {
        const [products] = await this.productsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: { category: true },
        });
        return products;
    }

    // CREA UN PRODUCTO CON LOS DATOS RECIBIDOS
    async addProducts(product: CreateProductDto):Promise<Product> {
        const categoryFound = await this.categoryRepository.findOne({where: {id: product.category.id}});
        if(!categoryFound){
            throw new BadRequestException('Category not found');
        }
        
        return this.productsRepository.save(product);
    }

    // BUSCA TODOS LOS PRODUCTOS
    async getProducts(): Promise<Product[]> {
        const products = await this.productsRepository.find({
            relations: ['category']});
        return products
    }

    // BUSCA POR NOMBRE

    async findByName(name:string):Promise<Product | undefined>{
        return this.productsRepository.findOne({where: {name}})
    }

    // BUSCA POR ID
    async findOne(id:string){
        const product = await this.productsRepository.findOne({where: {id}})
        return product

    }

    
    async update(id: string, product: UpdateProductDto):Promise<string> {
         await this.productsRepository.update(id, product)
       
        return id
    }

    async remove(id: string): Promise<string> {
        this.productsRepository.delete(id)
        return id;
    }
}