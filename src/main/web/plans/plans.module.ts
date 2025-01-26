import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/general/files/files.module';
import { PlansResolver } from './resolvers/plans.resolver';
import { PlansService } from './services/plans.service';
import { WebPlans } from './entities/plans.entity';
import { MailModule } from 'src/general/email/emial.module';

@Module({
  providers: [PlansResolver,PlansService],
  imports:[
    TypeOrmModule.forFeature([WebPlans]), FilesModule, MailModule
  ]
})
export class PlansModule {}
