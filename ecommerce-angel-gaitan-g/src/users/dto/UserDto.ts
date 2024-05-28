import { BadRequestException } from "@nestjs/common";
import { Order } from "src/order/order.entity";

export interface CreateUserDto {
    id: string;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: number;
    country?: string;
    city?: string;
    orders: Order[];
  }
  
export interface UpdateUserDto {
    email?: string;
    name?: string;
    password?: string;
    address?: string;
    phone?: string;
    country?: string;
    city?: string;
  }
  
export const validateCreateUser = (dto: CreateUserDto) => {
    if ( typeof dto.email !== 'string' || typeof dto.name !== 'string' || typeof dto.password !== 'string' ||
    typeof dto.address !== 'string' || typeof dto.phone !== 'string' || typeof dto.country !== 'string' || typeof dto.city !== 'string') {
        throw new BadRequestException('Invalid user data');            
    }
}
export const validateUpdateUserFields = (dto: UpdateUserDto) => {
    const fieldsToValidate = ['email', 'name', 'password', 'address', 'phone', 'country', 'city'];
    for (const field of fieldsToValidate) {
        if (dto[field] && typeof dto[field] !== 'string') {
            throw new BadRequestException('Invalid user data');
        }
    }
}