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

    @Column({length: 80})
    password: string

    @Column({default: false})
    isAdmin: boolean

    @Column()
    phone: number;

    @Column({nullable: true, length: 50})
    country?: string;

    @Column({nullable: true, length: 50, type: 'character varying'})
    city?: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}