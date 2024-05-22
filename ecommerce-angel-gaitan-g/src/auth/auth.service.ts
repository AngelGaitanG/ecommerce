import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    AuthUser() {
        return 'Esta accion autenticara a un usuario'
    }
}
