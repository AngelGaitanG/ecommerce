
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';

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
    getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        
        return this.productsService.findOne(id);
    }

    @Post('create')
    createProduct(@Body() product: Partial<Product>) {
        return this.productsService.addProducts(product);
    }

    @Put(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async updateProduct(@Body() product: Partial<Product>, @Param('id', ParseUUIDPipe) id:string): Promise<string> {
        
        return this.productsService.update(id, product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id:string):Promise<string> {
        return this.productsService.remove(id);
    }

}
