import { Module } from '@nestjs/common';
import { CardsCreateService } from './cardsCreate.service';
import { CardsCreateResolver } from './cardsCreate.resolver';
import { CardsModule } from '../cards/card.module';
import { CardsEmailModule } from '../cardsEmail/card.module';
import { CardsPhoneModule } from '../cardsPhone/cardPhone.module';
import { CardsWebModule } from '../cardsWeb/cardWeb.module';
import { CardsSocialModule } from '../cardsSocial/cardSocial.module';
import { CardsAddressModule } from '../cardsAddress/cardAddress.module';

@Module({
  providers: [CardsCreateService, CardsCreateResolver],
  imports: [
    CardsModule,CardsEmailModule,CardsPhoneModule,CardsWebModule,CardsSocialModule,CardsAddressModule,
  ]
})
export class CardsCreateModule {}
