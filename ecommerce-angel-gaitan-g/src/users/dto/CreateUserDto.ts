import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak',
      })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    password: string;

    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;
    
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    city: string;

    @IsEmpty()
    isAdmin: boolean;
}