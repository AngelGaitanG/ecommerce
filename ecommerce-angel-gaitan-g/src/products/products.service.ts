import { Injectable } from '@nestjs/common';
import { Product, ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    findAll() {
        return this.productsRepository.findAll();
    }

    findOne(id:number) {
        return this.productsRepository.findOne(id);
    }

    create(product: Product) {
        return this.productsRepository.create(product)
    }

    update(id: number, product: Partial<Product>) {
        return this.productsRepository.update(id, product)
    }

    remove(id: number) {
        return this.productsRepository.remove(id)
    }
}