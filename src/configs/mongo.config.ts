import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	const asService = configService.get('MONGO_AS_SERVICE')

	if (asService === 'true') {
		return {
			uri: getMongoStringAsService(configService)
		}
	}
	if (asService === 'false') {
		return {
			uri: getMongoString(configService)
		}
	}

	// return {
	// 	uri: getMongoString(configService),
	// 	//...getMongoOptions(),
	// }
}

const getMongoStringAsService = (configService: ConfigService) => configService.get('MONGO_URI_AS_SERVICE')

const getMongoString = (configService: ConfigService) =>
	'mongodb://' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PASSWORD') +
	'@' +
	configService.get('MONGO_HOST') +
	':' +
	configService.get('MONGO_PORT') +
	'/' +
	configService.get('MONGO_AUTHDATABASE');

// const getMongoOptions = () => ({
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// })