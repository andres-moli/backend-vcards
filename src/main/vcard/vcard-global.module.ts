import { Module } from '@nestjs/common';
import { CardsModule } from './cards/card.module';
import { CardsEmailModule } from './cardsEmail/card.module';
import { CardsPhoneModule } from './cardsPhone/cardPhone.module';
import { CardsWebModule } from './cardsWeb/cardWeb.module';
import { CardsSocialModule } from './cardsSocial/cardSocial.module';
import { CardsAddressModule } from './cardsAddress/cardAddress.module';
import { CardsCreateModule } from './cardsCreate/cardsCreate.module';

@Module({
  imports: [CardsModule,CardsEmailModule,CardsPhoneModule,CardsWebModule,CardsSocialModule,CardsAddressModule,CardsCreateModule]
})
export class VCardModuleGlobal {}
