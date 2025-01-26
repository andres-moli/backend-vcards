import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/general/files/files.module';
import { CardsResolver } from './resolvers/card.resolver';
import { CardsEmailService } from './services/card.service';
import { CardsEmails } from './entities/CardsEmails.entity';
import { MailModule } from 'src/general/email/emial.module';
import { CardsModule } from '../cards/card.module';

@Module({
  providers: [CardsResolver,CardsEmailService],
  imports:[
    TypeOrmModule.forFeature([CardsEmails]), CardsModule, MailModule
  ],
  exports: [CardsEmailService]
})
export class CardsEmailModule {}
