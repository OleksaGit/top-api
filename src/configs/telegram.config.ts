import { ConfigService } from '@nestjs/config';
import { ITelegramOption } from '../telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOption => {
	const token = configService.get('TELEGRAM_TOKEN');
	if (!token) {
		throw new Error('TELEGRAM_TOKEN not found')
	}
	return {
		token,
		chatId: configService.get('TELEGRAM_CHAT_ID') ?? '',
	}
}

