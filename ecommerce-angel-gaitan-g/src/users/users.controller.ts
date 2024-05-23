import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param() id) {
        const idParsed = parseInt(id.id);
        return this.usersService.findOne(idParsed);
    }

    @Post('create')
    create(@Body() user) {
        return this.usersService.create(user);
    }

    @Post(':id')
    update(@Param() id, @Body() user) {
        const idParsed = parseInt(id.id);
        return this.usersService.update(idParsed, user);
    }

    @Delete(':id')
    remove(@Param() id) {
        const idParsed = parseInt(id.id);
        return this.usersService.remove(idParsed);
    }
}
