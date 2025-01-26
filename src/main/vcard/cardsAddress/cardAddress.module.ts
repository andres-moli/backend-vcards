import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/general/files/files.module';
import { CardsAddressResolver } from './resolvers/cardAddress.resolver';
import { CardsAddressService } from './services/cardAddres.service';
import { CardsAddress } from './entities/CardsAddress.entity';
import { MailModule } from 'src/general/email/emial.module';
import { CardsModule } from '../cards/card.module';

@Module({
  providers: [CardsAddressResolver,CardsAddressService],
  imports:[
    TypeOrmModule.forFeature([CardsAddress]), CardsModule, MailModule
  ],
  exports: [CardsAddressService]
})
export class CardsAddressModule {}
