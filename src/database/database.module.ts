import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getSequelizeConfig } from '../configs/sequelize.config';
import { UserModel } from './models/user.model';
import { WorkshopModel } from './models/workshop.model';
import { StatusModel } from './models/status.model';

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const config = await getSequelizeConfig(configService)
				return {...config, models: [UserModel], autoLoadModels: true }
			},
		}),
		SequelizeModule.forFeature([
			UserModel,
			WorkshopModel,
			StatusModel,
		])
	],
	exports: [SequelizeModule],
})
export class DatabaseModule {}
