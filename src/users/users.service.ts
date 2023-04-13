import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model/user.model';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(UserModel)
		private readonly  userModel: typeof UserModel,
		// private readonly jwtService: JwtService
	) { }

	async createUser(dto: UserDto) {
		const salt = await genSalt(10);
		return await this.userModel.create({
			email: dto.login,
			pass_hash: await hash(dto.password, salt),
			first_name: dto.first_name,
			last_name: dto.last_name,
		})
	}
}
