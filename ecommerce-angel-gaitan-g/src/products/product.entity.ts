import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Category } from "../category/category.entity";
import { OrderDetail } from "../order/order-detail.entity";

@Entity({
    name : 'products'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({length: 50})
    name: string

    @Column('text')
    description: string

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number

    @Column()
    stock: number

    @Column({nullable: true, default: 'default.png'})
    imgUrl?: string

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({name: 'category_id'})
    category: Category
    

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.product)
    @JoinColumn()
    orderDetails: OrderDetail[];
}