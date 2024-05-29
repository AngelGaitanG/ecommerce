import { Type } from "class-transformer";
import { ArrayMinSize, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Product } from "src/products/product.entity";

export class CreateOrderDto {
    
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Product)
    products: Product[];
}