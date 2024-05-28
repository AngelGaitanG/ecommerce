
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { DataLoaderService } from 'src/data-loader/data-loader.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
        private readonly dataLoaderService: DataLoaderService
    ) {}

    @Post('seeder')
    async seedProducts(): Promise<Product[]> {
        await this.dataLoaderService.loadCategories();
        await this.dataLoaderService.loadProducts();
        return this.productsService.getProducts();
    }

    @Post('add')
    async addProducts(@Body() products: Product[]): Promise<Product[]> {
        const addedProducts = [];
        for(const product of products){
            const existingProduct = await this.productsService.findByName(product.name)
            if(!existingProduct){
                addedProducts.push(await this.productsService.addProducts(product))
            }
        }
        return addedProducts
    }

    @Get()
    async getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<Product[]> {
        return this.productsService.getAllProducts(page, limit);
    }
    @Get(':id')
    getProduct(@Param('id') id: string): Promise<Product> {
        
        return this.productsService.findOne(id);
    }

    @Post('create')
    createProduct(@Body() product: Partial<Product>) {
        return this.productsService.addProducts(product);
    }

    @Put(':id')
    async updateProduct(@Body() product: Partial<Product>, @Param('id') id): Promise<number> {
        
        return this.productsService.update(id, product);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id):Promise<string> {
        return this.productsService.remove(id);
    }

}
