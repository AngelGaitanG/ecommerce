import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ){}

  @Post()
  async createOrder(@Body() createOrder: {userId: string, productIds: { id: string }[] }): Promise<Order> {
    console.log(createOrder);
    console.log(createOrder.productIds);
    const { userId, productIds } = createOrder;
    return await this.orderService.addOrder(userId, productIds);
  }

  @Get(":id")
  async getOrder(@Param("id") id: string) {
    return await this.orderService.getOrder(id);
  }
}
