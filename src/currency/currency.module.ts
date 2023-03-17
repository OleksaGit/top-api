import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { CurrencyModel } from './currency.model/currency.model';
import { CurrencyController } from './currency.controller';

@Module({
  providers: [CurrencyService],
  imports: [
      TypegooseModule.forFeature([
          {
              typegooseClass: CurrencyModel,
              schemaOptions: {
                  collection: 'Currency'
              },
          }
      ])
  ],
  controllers: [CurrencyController]
})
export class CurrencyModule {}
