import {
    IsEmail,
	IsNotEmpty,
	IsString,
	Length,
} from 'class-validator';

export class RegisterDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    @Length(6,12)
    password: string
}