// mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './service/email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailController } from './controller/email.controller';
import { EmailProcessor } from './service/email.processor';
import { PushNotificationsService } from './service/push.service';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'appmovilcytech@gmail.com',
          pass: 'slau woxa dfhe qikr',
        },
      },
      defaults: {
        from: 'APP SELLER',
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ClientsModule.register([
      {
        name: 'EMAIL_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],  // URL de conexión a RabbitMQ
          queue: 'email_queue',  // Nombre de la cola
          queueOptions: {
            durable: true,  // La cola persiste aunque RabbitMQ se reinicie
          },
        },
      },
    ]),
  ],
  providers: [MailService, EmailProcessor,PushNotificationsService],
  exports: [MailService, PushNotificationsService],
  controllers: [EmailController]
})
export class MailModule {}
