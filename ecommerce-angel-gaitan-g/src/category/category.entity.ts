import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Product } from "../products/product.entity";

@Entity({name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({length: 50, type: 'varchar', unique: true, nullable: false})
    name: string;


    @OneToMany(() => Product, product => product.category)
    @JoinColumn()
    products: Product[];
}