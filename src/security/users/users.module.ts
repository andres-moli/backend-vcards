import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserKey } from './entities/user-key.entity';
import { MailModule } from 'src/general/email/emial.module';
import { FilesModule } from 'src/general/files/files.module';
@Module({
  imports:[    
    TypeOrmModule.forFeature([User, UserKey]),
    MailModule,
    FilesModule
  ],
  providers: [
    UsersResolver, 
    UsersService,
    AuthService
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
