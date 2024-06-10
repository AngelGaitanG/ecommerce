import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import { Order } from 'src/order/order.entity';



@Injectable()
export class usersRepository {
    constructor( @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>
    ) {}

    async getAllUsers(page: number, limit: number):Promise <User[]> {
        if(!page || !limit) {
            throw new BadRequestException('La pagina y el limite son requeridos');
        }
        if (page < 1 || limit < 1) {
        throw new BadRequestException('La pagina y el limite deben ser mayor a 0');
        }
        const [users] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: { orders: true },
        });
        return users;
    }
    
    async getUserByEmail(email: string): Promise<User> {
        if(!email) {
            throw new NotFoundException('Email no enviado');
        }
        return this.usersRepository.findOne({where: {email: email}});
    }

    async findOne(id: string): Promise<User> {
        if(!id) {
            throw new NotFoundException('Id no enviado');
        }
        const user = await this.usersRepository.findOne({where: {id: id}});
        if (!user) {
            throw new BadRequestException('Usuario no encontrado')
        }
        return user;
    }

 async registerUser (user: Partial<User>): Promise<Partial<User>> {
    if(!user){
        throw new NotFoundException('Usuario no enviado');
    }
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser)

    const {password, role, ...result} = newUser
    return result
 }
    
    async updateUser(id: string, user: Partial<User>): Promise<User> {
        if(!id) {
            throw new BadRequestException('Id no enviado');
        }
        const foundUser = await this.usersRepository.findOne({ where: { id: id } });
        if(!foundUser){
            throw new NotFoundException('El usuario no ha sido encontrado');
        }
        Object.assign(foundUser, user);
        await this.usersRepository.save(foundUser);
        return foundUser;
      }

      async deleteUser(id: string): Promise<User> {
        if(!id) {
            throw new BadRequestException('Id no enviado');
        }
        const foundUser = await this.usersRepository.findOne({ where: { id: id } });
        if (!foundUser) throw new NotFoundException('Usuario no ha sido encontrado');
        await this.orderRepository.delete({user: foundUser})
        await this.usersRepository.delete(foundUser);
        return foundUser;
      }
}
