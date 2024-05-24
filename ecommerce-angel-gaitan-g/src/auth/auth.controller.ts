import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/AuthDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signIn(@Body()credentials: SignInDto){
        const {email, password} = credentials
        return this.authService.signIn(email, password)
    }

    @Get()
    AuthUser(){
        return this.authService.AuthUser()
    }
}
