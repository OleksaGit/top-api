import { ConfigService } from '@nestjs/config';

export const getSequelizeConfig = async (configService: ConfigService) => {
	return {
		dialect: configService.get('SEQUELIZE_DIALECT'),
		host: configService.get('SEQUELIZE_HOST'),
		port: configService.get<number>('SEQUELIZE_PORT'),
		username: configService.get('SEQUELIZE_USERNAME'),
		password: configService.get('SEQUELIZE_PASSWORD'),
		database: configService.get('SEQUELIZE_DATABASE'),
	}
}