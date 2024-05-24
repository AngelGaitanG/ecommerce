import { BadRequestException } from "@nestjs/common";

export interface CreateUserDto {
    id: number;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: string;
    country?: string;
    city?: string;
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
    if (typeof dto.id !== 'number' || typeof dto.email !== 'string' || typeof dto.name !== 'string' || typeof dto.password !== 'string' ||
    typeof dto.address !== 'string' || typeof dto.phone !== 'string' || typeof dto.country !== 'string' || typeof dto.city !== 'string') {
        throw new BadRequestException('Invalid user data');            
    }
}
export const validateUpdateUser =(dto: UpdateUserDto) => {
    if (typeof dto.email !== 'string' || typeof dto.name !== 'string' || typeof dto.password !== 'string' ||
    typeof dto.address !== 'string' || typeof dto.phone !== 'string' || typeof dto.country !== 'string' || typeof dto.city !== 'string') {
        throw new BadRequestException('Invalid user data');            
    }
}