import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, validateCreateUser, validateUpdateUser } from './dto/UserDto';
import { User } from './users.repository';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5):Omit<User, 'password'>[] {
        return this.usersService.findAll(page, limit);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    findOne(@Param() id):Omit<User, 'password'> {
        const idParsed = parseInt(id.id);
        return this.usersService.findOne(idParsed);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() user: CreateUserDto):number {
        try {
            validateCreateUser(user)
        } catch (error) {
            throw error
        }
        return this.usersService.create(user);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    update(@Param() id, @Body() user: UpdateUserDto):number {
        const idParsed = parseInt(id.id);
        try {
            validateUpdateUser(user)
        } catch (error) {
            throw error
        }
        return this.usersService.update(idParsed, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    remove(@Param() id):number {
        const idParsed = parseInt(id.id);
        return this.usersService.remove(idParsed);
    }
}
