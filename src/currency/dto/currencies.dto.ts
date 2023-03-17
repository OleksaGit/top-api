import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CurrenciesDto {

	@Type(() => CurrencyDto)
	currencies: CurrencyDto[]
}

export class CurrencyDto {
	@IsString()
	ccy: string

	@IsString()
	base_ccy: string

	@IsString()
	buy: string

	@IsString()
	sale: string
}