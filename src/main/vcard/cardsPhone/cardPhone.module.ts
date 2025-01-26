import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/general/files/files.module';
import { CardsPhoneResolver } from './resolvers/cardPhone.resolver';
import { CardsPhoneService } from './services/cardPhone.service';
import { CardsPhones } from './entities/CardsPhones.entity';
import { MailModule } from 'src/general/email/emial.module';
import { CardsModule } from '../cards/card.module';

@Module({
  providers: [CardsPhoneResolver,CardsPhoneService],
  imports:[
    TypeOrmModule.forFeature([CardsPhones]), CardsModule, MailModule
  ],
  exports: [CardsPhoneService]
})
export class CardsPhoneModule {}
