import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../users/user.entity";
import { OrderDetail } from "./order-detail.entity";
@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;
    
    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order, {cascade: true})
    orderDetail: OrderDetail;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;
    
}


