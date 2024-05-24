import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {}
    AuthUser() {
        return 'Esta accion autenticara a un usuario'
    }

    signIn(email: string, password: string) {
        if(!email || !password) {
            throw new UnauthorizedException('Credentials are required')
        }

        const user = this.usersRepository.findByEmail(email);
        if(!user) {
            throw new UnauthorizedException('Credentials are not valid')
        }

        const isPasswordValid = this.usersRepository.comparePassword(password, user.password);
        if(!isPasswordValid) {
            throw new UnauthorizedException('Credentials are not valid')
        }
        const authorization = true;

        return authorization
    }


}
