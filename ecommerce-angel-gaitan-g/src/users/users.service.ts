import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository
    ) {}

    findAll(page:number = 1, limit:number = 5):Omit<User, 'password'>[] {
        return this.usersRepository.findAll(page, limit).map(user => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result
        });
    }

    findOne(id: number): Omit<User, 'password'> {
        const user = this.usersRepository.findOne(id);
        if (!user) {
            throw new Error('User not found')
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
    }

    create(user: User):number {
        this.usersRepository.create(user);
        return user.id
    }

    update(id: number, user: Partial<User>):number {
        this.usersRepository.update(id, user);
        
        return id
    }

    remove(id: number):number {
        this.usersRepository.remove(id);
        return id; 
    }
}
