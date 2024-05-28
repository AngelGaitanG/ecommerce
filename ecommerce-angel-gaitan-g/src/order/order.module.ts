import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrderService } from './order.service';
import { OrderDetail } from './order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, OrderDetail])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
