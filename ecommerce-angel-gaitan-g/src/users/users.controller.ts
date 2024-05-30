import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

import { OrderService } from 'src/order/order.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly orderService: OrderService
    ) {}

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5):Promise<User[]> {
        return this.usersService.getAllUsers(page, limit);
    }

    @Get()
    @UseGuards(AuthGuard)
    getUsers(){
        return this.usersService.getUsers();
    }
 
    @Get('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getAdmin(){
        return 'Ruta protegida'
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
