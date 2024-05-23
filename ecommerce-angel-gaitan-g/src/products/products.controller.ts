import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    getProduct(@Param() id) {
        const idParsed = parseInt(id.id);
        return this.productsService.findOne(idParsed);
    }

    @Post('create')
    createProduct(@Body() product) {
        return this.productsService.create(product);
    }

    @Post(':id')
    updateProduct(@Body() product, @Param() id) {
        const idParsed = parseInt(id.id);
        return this.productsService.update(idParsed, product);
    }

    @Delete(':id')
    deleteProduct(@Param() id) {
        const idParsed = parseInt(id.id);
        return this.productsService.remove(idParsed);
    }
}
