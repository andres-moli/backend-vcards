import { Global, Module } from '@nestjs/common';
import { SuscriptionService } from './services/suscription.service';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
  providers: [
    SuscriptionService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
      useFactory: () => {
        return new PubSub();
      }
    }],
  exports: [SuscriptionService, 'PUB_SUB'],
})
export class SuscriptionModule {}