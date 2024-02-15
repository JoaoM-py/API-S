import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name: string;
}