import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { config } from '../../config';
import { MailModule } from 'src/general/email/emial.module';

@Global()
@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [ JwtStrategy, PassportModule, JwtModule ],
  imports:[
    ConfigModule,
    PassportModule.register({ defaultStrategy:'jwt' }),
    JwtModule.registerAsync({
      imports:[ ConfigModule ],
      inject: [ config.KEY ],
      useFactory: (configService: ConfigType<typeof config>) => ({
          secret: configService.jwt.secret,
          signOptions:{
            expiresIn: configService.jwt.expiresIn
          }        
      })
    }),
    UsersModule,
    MailModule,
  ]
})
export class AuthModule {}
