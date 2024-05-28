import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Order } from "src/order/order.entity";
@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({length: 50})
    name: string

    @Column({length: 50, unique: true})
    email: string

    @Column({length: 20, select: false})
    password: string

    @Column()
    phone: number;

    @Column({nullable: true, length: 50})
    country?: string;

    @Column({nullable: true, length: 50})
    city?: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}