import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.repository';
import { CreateProductDto, UpdateProductDto, validateCreateProduct, validateUpdateProduct } from './dto/ProductDto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Product[] {
        return this.productsService.findAll(page, limit);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProduct(@Param() id): Product {
        const idParsed = parseInt(id.id);
        return this.productsService.findOne(idParsed);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    createProduct(@Body() product: CreateProductDto):number {
        try {
            validateCreateProduct(product)
        } catch (error) {
            throw error
        }
        return this.productsService.create(product);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    updateProduct(@Body() product: UpdateProductDto, @Param() id):number {
        const idParsed = parseInt(id.id);
        try {
            validateUpdateProduct(product)
        } catch(error) {
            throw error 
        }
        return this.productsService.update(idParsed, product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    deleteProduct(@Param() id):number {
        const idParsed = parseInt(id.id);
        return this.productsService.remove(idParsed);
    }

}
