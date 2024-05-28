import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
    private readonly usersRepository: Repository<User>
    ) {}
    AuthUser() {
        return 'Esta accion autenticara a un usuario'
    }

    signIn(email: string, password: string) {
        if(!email || !password) {
            throw new UnauthorizedException('Credentials are required')
        }

        const user = this.usersRepository.findOne({where: {email: email, password: password}});
        if(!user) {
            throw new UnauthorizedException('Credentials are not valid')
        }

        return user;
    }


}
