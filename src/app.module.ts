import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { BullModule } from '@nestjs/bull';
import path, { join } from 'path';

import * as Joi from 'joi';

import { SecurityModule } from './security/security.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from './main/main.module';
import { GeneralModule } from './general/general.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { config } from './config';
import { PatternsModule } from './patterns/patterns.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomPasswordScalar } from './security/users/scalars/password.scalar';
import { ThrowExceptionFilter } from './common/functions/throw-exception-filter';
import { AcceptLanguageResolver, GraphQLWebsocketResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { LanguageInterceptor } from './common/i18n/decorators/language.decorator';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[config],
      validationSchema: Joi.object({
        STATE:Joi.string().required(),

        APP_PORT:Joi.number().required(),
        
        HTTPS:Joi.string().optional(),
        HTTPS_PFX_PATH:Joi.string().optional(),
        HTTPS_PFX_PASS:Joi.string().optional(),

        FILES_UPLOAD_LIMIT:Joi.string().required(),

        DB_TYPE:Joi.string().required(),
        DB_HOST:Joi.string().required(),
        DB_PORT:Joi.number().required(),
        DB_USERNAME:Joi.string().required(),
        DB_PASSWORD:Joi.string().required(),
        DB_NAME:Joi.string().required(),

        JWT_SECRET:Joi.string().required(),
        JWT_EXPIRES_IN:Joi.string().required(),

        
        DB_FILE_MODE:Joi.string().required(),

        DB_MONGODB_SERVER:Joi.string().optional(),
        DB_MONGODB_NAME:Joi.string().optional(),

        SA_EMAIL:Joi.string().required(),
        SA_PASSWORD:Joi.string().required(),

        BASE_URL:Joi.string().required(),

      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
      plugins:[
        ApolloServerPluginLandingPageLocalDefault()
      ],
      resolvers: { ValidatePassword: CustomPasswordScalar },
      formatError: (formatttedError, error: any) => {
          return {
            message: formatttedError.message,
            code: formatttedError.extensions.code,
            status: error.extensions.status,
            path: process.env.STATE === 'prod' ? undefined : formatttedError.path,
            locations: process.env.STATE === 'prod' ? undefined : formatttedError.locations,
          };
        }
      }
    ),  
    TypeOrmModule.forRootAsync({
      imports:[ ConfigModule ],
      inject: [ config.KEY ],
      useFactory: (configService: ConfigType<typeof config>) => {
        console.log('configService', configService)

        return {
          type: configService.database.type as any,
          host: configService.database.host,
          port: +configService.database.port,
          username: configService.database.user,
          password: configService.database.password,
          database: configService.database.name,
          synchronize: true,
          autoLoadEntities: true,
          logging: true,   
          timezone: 'Z',  
          useUTC: true,
          extra: {
            trustServerCertificate: true,
          }     
        }
      }
    }),
    EventEmitterModule.forRoot(),
    ...(process.env.REDIS_PORT)?
    [
      BullModule.forRootAsync({
        imports:[ ConfigModule ],
        inject: [ config.KEY ],
        useFactory: async (configService: ConfigType<typeof config>) => ({
          redis: {
            host: configService.redis.host,
            port: +configService.redis.port,
            db: 1
          }
        }),
      })
    ]:[],
    ...(process.env.DB_MONGODB_SERVER)?
      [
        MongooseModule.forRoot(process.env.DB_MONGODB_SERVER + '/' + process.env.DB_MONGODB_NAME, { dbName: process.env.DB_MONGODB_NAME })
      ]:[],
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '/common/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public', 
    }),
    SecurityModule,
    MainModule,
    GeneralModule,
    PatternsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ThrowExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LanguageInterceptor,
    },
  ],
})
export class AppModule {}
