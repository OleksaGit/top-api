import { IsString } from 'class-validator';

export class UserDto {
	@IsString()
	login: string;

	@IsString()
	password: string;

	@IsString()
	first_name: string;

	@IsString()
	last_name: string;
}