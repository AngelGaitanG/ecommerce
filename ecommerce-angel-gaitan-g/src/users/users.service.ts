import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import { Order } from 'src/order/order.entity';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>
    ) {}

    async getAllUsers(page: number, limit: number) {
        const [products] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: { orders: true },
        });
        return products;
    }
    

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({where: {id: id}});
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user;
    }

 async registerUser (user: Partial<User>): Promise<Omit<User, 'password'>> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser)

    const {password, ...result} = newUser
    return result
 }
    
    async getUsers():Promise<Omit<User, 'password'>[]> {
        const users = await this.usersRepository.find({relations: ['orders']});
        const withoutPass = users.map(user => {
            
            const {password, ...result} = user
            return result
        })
        return withoutPass
    }
    async updateUser(id: string, user: Partial<User>): Promise<User> {
        const foundUser = await this.usersRepository.findOne({ where: { id: id } });
        if(!foundUser){
            throw new NotFoundException('User not found');
        }
        Object.assign(foundUser, user);
        await this.usersRepository.save(foundUser);
        return foundUser;
      }

      async deleteUser(id: string): Promise<User> {
        const foundUser = await this.usersRepository.findOne({ where: { id: id } });
        if (!foundUser) throw new NotFoundException('User not found');
        await this.orderRepository.delete({user: foundUser})
        await this.usersRepository.delete(foundUser);
        return foundUser;
      }
}
