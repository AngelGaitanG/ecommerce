import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import {Repository} from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){}

    async addOrder(userId: string, productIds: any): Promise<Order> {

        if (!Array.isArray(productIds)) {
        throw new NotFoundException('products is not an array');
    }
        const userFounded = await this.userRepository.findOneBy({id: userId});
        if(!userFounded){
            throw new NotFoundException('User not found');
        }

        let total = 0;
        const updatedProducts = [];

        for(const product of productIds){
            const productFounded = await this.productRepository.findOne({where: {id: product.id}});
            if(!productFounded){
                throw new NotFoundException('Product not found');
            }
            if(productFounded.stock < 1){
                throw new NotFoundException("No stock :(")
            }
            productFounded.stock -= 1;
            total += productFounded.price;
            updatedProducts.push(productFounded);
        }
        if(!updatedProducts){
            throw new NotFoundException("Products didn't arrive...")
        }

        await this.productRepository.save(updatedProducts);

        const order = this.orderRepository.create({
            date: new Date(),
            user: userFounded,
        })

        const orderDetail = this.orderDetailRepository.create({
            price: total,
            product: updatedProducts,
        })
        await this.orderDetailRepository.save(orderDetail)

        order.orderDetail = orderDetail;
        await this.orderRepository.save(order)
        
        return order
        
    }

    async getOrder(id: string){
        const order = await this.orderRepository.findOne({where: {id}, relations: {orderDetail: {product: true}}});
        return order;
    }

}
