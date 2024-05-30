import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signIn(@Body()LoginUserDto: LoginUserDto){
        return this.authService.signIn(LoginUserDto)
    }

    @Post('signup')
    signUp(@Body()user: CreateUserDto){
        return this.authService.signUp(user)
    }

    @Get()
    AuthUser(){
        return this.authService.AuthUser()
    }
}
