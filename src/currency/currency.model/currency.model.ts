import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { CurrencyDto } from '../dto/currencies.dto';

export interface CurrencyModel extends Base {}
export class CurrencyModel extends TimeStamps{

	@prop()
	currencies: CurrencyDto[];

}
