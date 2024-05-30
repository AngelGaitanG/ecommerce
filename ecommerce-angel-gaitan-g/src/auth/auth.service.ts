import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/LoginUserDto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { Role } from './role.enum';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
    ) {}
    AuthUser() {
        return 'Esta accion autenticara a un usuario'
    }

    async signIn(LoginUserDto: LoginUserDto) {
        const {email, password} = LoginUserDto;

        if(!email || !password) {
            throw new UnauthorizedException('Credentials are required')
        }

        const dbUser = await this.usersService.getUserByEmail(email)

        if(!dbUser) {
            throw new BadRequestException('Credentials invalid')
        }

        if(!dbUser.password || !password){
            throw new BadRequestException('algo salio mal')
        }

        const isPasswordValid = bcrypt.compare(password, dbUser.password) 

        if(!isPasswordValid) {
            throw new BadRequestException('Credentials invalid')
        }

        const userPayload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email,
            roles: [dbUser.isAdmin ? Role.Admin : Role.User]
        }

        const token = this.jwtService.sign(userPayload)

        return {success: true, token: token};
    }

    async signUp(user: CreateUserDto) {

        const dbUser = await this.usersService.getUserByEmail(user.email)

        if(dbUser) {
            throw new BadRequestException(' el usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        
        if(!hashedPassword) {
            throw new BadRequestException('Password could not be hashed')
        }

        return this.usersService.registerUser({...user, password: hashedPassword}) 
    }


}
