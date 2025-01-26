import { Module } from '@nestjs/common';
import { DummyService } from './services/dummy.service';
import { DummyResolver } from './resolvers/dummy.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dummy } from './entities/dummy.entity';
import { DummyItem } from './entities/dummy-item.entity';
import { DummyType } from './entities/dummy-type.entity';
import { DummyGroup } from './entities/dummy-group.entity';
import { DummyFamily } from './entities/dummy-family.entity';
import { UsersModule } from '../../security/users/users.module';

@Module({
  providers: [DummyResolver, DummyService],
  imports:[
    TypeOrmModule.forFeature([Dummy,DummyItem,DummyType,DummyGroup,DummyFamily]),
    UsersModule
  ]
})
export class DummyModule {}
