import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signIn(@Body()LoginUserDto: LoginUserDto){
        return this.authService.signIn(LoginUserDto)
    }

    @Get()
    AuthUser(){
        return this.authService.AuthUser()
    }
}
