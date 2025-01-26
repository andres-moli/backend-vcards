import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/general/files/files.module';
import { CardsResolver } from './resolvers/card.resolver';
import { CardsService } from './services/card.service';
import { Cards } from './entities/Cards.entity';
import { MailModule } from 'src/general/email/emial.module';
import { UsersModule } from 'src/security/users/users.module';

@Module({
  providers: [CardsResolver,CardsService],
  imports:[
    TypeOrmModule.forFeature([Cards]), FilesModule, MailModule, UsersModule
  ],
  exports: [CardsService]
})
export class CardsModule {}
