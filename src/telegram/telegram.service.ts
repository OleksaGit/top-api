import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf'
import { ITelegramOption } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegramOption;

	constructor(
		@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOption
	) {
		this.options = options;
		this.bot = new Telegraf(options.token)
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message)
	}
}
