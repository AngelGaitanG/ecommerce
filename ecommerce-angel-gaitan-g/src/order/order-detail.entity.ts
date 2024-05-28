import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "./order.entity";
import { Product } from "../products/product.entity";
@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @OneToOne(() => Order, order => order.orderDetail, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable({
        name:'orderdetails_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    product: Product[];
}