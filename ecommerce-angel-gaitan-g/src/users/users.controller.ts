import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

import { OrderService } from 'src/order/order.service';
import { CreateUserDto } from './dto/CreateUserDto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly orderService: OrderService
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5):Promise<User[]> {
        return this.usersService.getAllUsers(page, limit);
    }

    @Get()
    getUsers(){
        return this.usersService.getUsers();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id', ParseUUIDPipe) id: string):Promise <User> {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.usersService.registerUser(user);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    update(@Param('id', ParseUUIDPipe) id:string, @Body() user: User) {
        
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async remove(@Param('id', ParseUUIDPipe) id:string) {
        await this.usersService.deleteUser(id);
        return {message: "Usuario eliminado"}
    }
}
