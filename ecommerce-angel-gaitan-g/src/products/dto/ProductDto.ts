import { BadRequestException } from "@nestjs/common";

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
  category: string
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: boolean;
  imgUrl?: string;
}


export const validateCreateProduct = (dto: CreateProductDto) => {
  if ( typeof dto.name !== 'string' || typeof dto.description !== 'string' ||
  typeof dto.price !== 'number' || typeof dto.stock !== 'boolean' || typeof dto.imgUrl !== 'string') {
      throw new BadRequestException('Invalid product data');            
  }
}
export const validateUpdateProduct =(dto: UpdateProductDto) => {
  if (typeof dto.name !== 'string' || typeof dto.description !== 'string' ||
  typeof dto.price !== 'number' || typeof dto.stock !== 'boolean' || typeof dto.imgUrl !== 'string') {
      throw new BadRequestException('Invalid product data');            
  }
}