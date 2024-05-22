import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findAll() {
        return 'Esta accion retornara todos los usuarios';
    }
}
