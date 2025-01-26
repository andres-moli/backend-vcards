import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/general/files/files.module';
import { CardsWebResolver } from './resolvers/cardWeb.resolver';
import { CardsWebService } from './services/cardWeb.service';
import { CardsWeb } from './entities/CardsWeb.entity';
import { MailModule } from 'src/general/email/emial.module';
import { CardsModule } from '../cards/card.module';

@Module({
  providers: [CardsWebResolver,CardsWebService],
  imports:[
    TypeOrmModule.forFeature([CardsWeb]), CardsModule, MailModule
  ],
  exports: [CardsWebService]
})
export class CardsWebModule {}
