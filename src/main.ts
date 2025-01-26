import { NestFactory } from '@nestjs/core';
import { 
  ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as https from 'https';
import * as bodyParser from 'body-parser';

import * as express from 'express';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ThrowExceptionFilter } from './common/functions/throw-exception-filter';

import { execute, subscribe } from 'graphql';
import { GraphQLSchemaBuilderModule, GraphQLSchemaHost } from '@nestjs/graphql';
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServer } from 'apollo-server-express';
import { I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const server = express.default();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), new GraphQLSchemaBuilderModule);
  app.useGlobalFilters(new ThrowExceptionFilter());
  configureMiscellaneous(app);
  configureSwagger(app);
  await app.init();

  let appServer: any = app;

  if (process.env.HTTPS) appServer = configureHttpsServer(server);
  await configureSuscriptions(app, server);

  appServer.listen(+process.env.APP_PORT);
}

function configureMiscellaneous(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();
  app.useLogger(['error', 'warn']);
  app.use(bodyParser.json({ limit: process.env.FILES_UPLOAD_LIMIT }));
  app.use(
    bodyParser.urlencoded({
      limit: process.env.FILES_UPLOAD_LIMIT,
      extended: true,
    }),
  );

  app.useGlobalPipes(
    new I18nValidationPipe(),
  );
}

function configureHttpsServer(server) {
  const httpsOptions = {
    pfx: fs.readFileSync(process.env.HTTPS_PFX_PATH),
    passphrase: process.env.HTTPS_PFX_PASS,
  };
  const httpsServer = https.createServer(httpsOptions, server);
  return httpsServer;
}

async function configureSuscriptions(app, server) {
  const { schema } = app.get(GraphQLSchemaHost);
  const apolloServer = new ApolloServer({
    schema
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: server, path: '/graphql' });
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
    onConnect: () => {
      console.log("-- Usuario graphql Conectado -- ");
    },
  },
    {
      server: server,
      path: '/graphql',
    }
  );
}

function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('ANDRES MOLINA')
    .setVersion('1.0')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

bootstrap();
