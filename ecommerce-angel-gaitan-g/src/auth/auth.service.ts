import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/LoginUserDto';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
    private readonly usersRepository: Repository<User>
    ) {}
    AuthUser() {
        return 'Esta accion autenticara a un usuario'
    }

    async signIn(LoginUserDto: LoginUserDto) {
        const {email, password} = LoginUserDto
        if(!email || !password) {
            throw new UnauthorizedException('Credentials are required')
        }

        const user = await this.usersRepository.findOne({where: {email: email, password: password}});
        if(!user) {
            throw new UnauthorizedException('Credentials are not valid')
        } else {return user}
    }


}
