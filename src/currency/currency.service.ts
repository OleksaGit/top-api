import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CurrencyModel } from './currency.model/currency.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CurrenciesDto } from './dto/currencies.dto';


@Injectable()
export class CurrencyService {
	constructor(@InjectModel(CurrencyModel) private readonly currencyModel: ModelType<CurrencyModel>) {
	}

	async create(dto: CurrenciesDto): Promise<DocumentType<CurrencyModel>> {
		return this.currencyModel.create(dto)
	}
}
