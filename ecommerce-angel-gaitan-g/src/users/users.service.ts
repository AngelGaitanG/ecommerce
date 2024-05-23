import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository
    ) {}

    findAll():any {
        return this.usersRepository.findAll();
    }

    findOne(id: number) {
        return this.usersRepository.findOne(id);
    }

    create(user: User) {
        return this.usersRepository.create(user);
    }

    update(id: number, user: Partial<User>) {
        return this.usersRepository.update(id, user);
    }

    remove(id: number) {
        return this.usersRepository.remove(id);
    }
}
