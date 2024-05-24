import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
}

@Injectable()
export class ProductsRepository {
  private products: Product[] = [{
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 1000,
    stock: true,
    imgUrl: 'https://example.com/product1.jpg'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 2000,
    stock: false,
    imgUrl: 'https://example.com/product2.jpg'
  }];

  findAll(page: number = 1, limit: number = 5): Product[] {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (startIndex >= this.products.length) {
      throw new NotFoundException('Página fuera de rango');
    }
    return this.products.slice(startIndex, endIndex);
  }

  findOne(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  create(product: Product): void {
    this.products.push(product);
  }

  update(id: number, product: Partial<Product>): void {
    const existingProduct = this.findOne(id);
    if (existingProduct) {
      Object.assign(existingProduct, product);
    }
  }

  remove(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }
}
