import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { CurrencyService } from './currency.service';
import { CurrenciesDto } from './dto/currencies.dto';
import { Cron } from '@nestjs/schedule';


@Controller('currencies')
export class CurrencyController {
	constructor(
		private readonly currencyService: CurrencyService,
		private readonly telegramService: TelegramService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CurrenciesDto) {
		return this.currencyService.create(dto);
	}

	@Cron('0 9 * * *')
	@UsePipes(new ValidationPipe())
	@Get('/')
	async getCurrencies() {
		return this.currencyService.getCurrencies();
	}

}
