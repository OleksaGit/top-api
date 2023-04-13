import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {
	}


	@Post('register_pg')
	async registerPG(@Body() dto: UserDto) {
		// const oldUser = await this.authService.findUser(dto.login);
		// if (oldUser) {
		// 	throw new BadRequestException(ALREADY_REGISTERED_ERROR)
		// }
		return this.userService.createUser(dto)

	}
}
