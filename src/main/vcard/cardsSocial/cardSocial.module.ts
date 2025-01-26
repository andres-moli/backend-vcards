import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/general/files/files.module';
import { CardsSocialResolver } from './resolvers/cardSocial.resolver';
import { CardsSocialService } from './services/cardSocial.service';
import { CardsSocial } from './entities/CardsSocial.entity';
import { MailModule } from 'src/general/email/emial.module';
import { CardsModule } from '../cards/card.module';

@Module({
  providers: [CardsSocialResolver,CardsSocialService],
  imports:[
    TypeOrmModule.forFeature([CardsSocial]), CardsModule, MailModule
  ],
  exports: [CardsSocialService]
})
export class CardsSocialModule {}
