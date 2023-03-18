import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CurrencyModel } from './currency.model/currency.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CurrenciesDto, CurrencyDto } from './dto/currencies.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { API_URL } from './currencies.constants';
import { lastValueFrom } from 'rxjs';
import { TelegramService } from '../telegram/telegram.service';
import { format } from 'date-fns'

enum CCY  {
	EUR = 'EUR',
	USD = 'USD',
	ALL = 'ALL',
}

@Injectable()
export class CurrencyService {
	constructor(
		@InjectModel(CurrencyModel) private readonly currencyModel: ModelType<CurrencyModel>,
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
		private readonly telegramService: TelegramService,
	) {
	}

	async getCurrencies() {
		try {
			const res = await this.httpService.get<CurrencyDto[]>(API_URL.currencies, {
				params: {},
				headers: {
					'User-Agent': 'PostmanRuntime/7.31.1',
				}
			})
			const { data } = await lastValueFrom(res)
			await this.create({ currencies: data })
			await this.telegramService.sendMessage(CurrencyService.createMessageTg(data))
			return  data
		} catch (e) {
			Logger.error(e)
		}

	}

	private static createMessageTg(data: CurrencyDto[], ccy: CCY = CCY.ALL ): string {
		const result: string[] = []
		result.push(`Курс валют на сьогоді\n${format(new Date(), 'EEEEEE - dd.MM.yyyy')}\n`)

		if (CCY.ALL) {
			data.forEach((currency) => {
					result.push(
						  `${currency.ccy} - ${currency.base_ccy}\n`
						+ `Купівля: ${currency.buy}\n`
						+ `Продаж: ${currency.sale}\n`
					)
				}
			)
		} else {
			data.forEach((currency) => {
				if (currency.ccy === ccy) {
					result.push(
						  `${currency.ccy} - ${currency.base_ccy}\n`
						+ `Купівля: ${currency.buy}\n`
						+ `Продаж: ${currency.sale}\n`
					)

				}
			})
		}
		result.push(`Ваш домашній сервіс ;)`)
		return result.join('\n')
	}


	async create(dto: CurrenciesDto): Promise<DocumentType<CurrencyModel>> {
		return this.currencyModel.create(dto)
	}
}
