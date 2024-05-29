import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/CreateOrderDto';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ){}

  @Post()
  async createOrder(@Body() CreateOrderDto: CreateOrderDto ): Promise<Order> {
    console.log(CreateOrderDto);
    console.log(CreateOrderDto.products);
    const { userId, products } = CreateOrderDto;
    return await this.orderService.addOrder(userId, products);
  }

  @Get(":id")
  async getOrder(@Param("id", ParseUUIDPipe) id: string) {
    return await this.orderService.getOrder(id);
  }
}
