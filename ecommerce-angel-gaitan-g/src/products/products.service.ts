import { Injectable } from '@nestjs/common';
import { Product, ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    findAll(page: number = 1, limit: number = 5): Product[] {
        return this.productsRepository.findAll(page, limit);
    }

    findOne(id:number): Product {
        const product = this.productsRepository.findOne(id);
        if(!product) {
            throw new Error('Product not found')
        }
        return product;
    }

    create(product: Product):number {
        this.productsRepository.create(product)
        return product.id
    }

    update(id: number, product: Partial<Product>):number {
         this.productsRepository.update(id, product)
       
        return id
    }

    remove(id: number):number {
        this.productsRepository.remove(id)
        return id;
    }
}