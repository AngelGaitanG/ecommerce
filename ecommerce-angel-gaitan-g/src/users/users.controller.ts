import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto,  validateCreateUser, } from './dto/UserDto';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto, validateUpdateUserFields } from './dto/UserDto';
import { OrderService } from 'src/order/order.service';
// import { User } from './users.repository';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { Order } from 'src/order/order.entity';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly orderService: OrderService
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5):Promise<User[]> {
        return this.usersService.getAllUsers(page, limit);
    }

    @Get()
    getUsers(){
        return this.usersService.getUsers();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string):Promise <User> {
        return this.usersService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() user: User) {
        return this.usersService.registerUser(user);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id:string, @Body() user: UpdateUserDto) {
        try {
            validateUpdateUserFields(user)
        } catch (error) {
            throw error
        }
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id:string) {
        await this.usersService.deleteUser(id);
        return {message: "Usuario eliminado"}
    }
}
