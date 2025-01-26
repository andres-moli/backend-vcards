// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from '../service/email.service';
import { SendEmailDto, SendPushNotificationDto } from '../dto/email.dto';
import { PushNotificationsService } from '../service/push.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: MailService,
    private readonly pushNoti: PushNotificationsService
  ) {}

  @Post('send-mass-email')
  async sendMassEmail(@Body() sendEmailDto: SendEmailDto) {
    const { to, subject, template, context } = sendEmailDto;
    // Aquí validas el DTO automáticamente gracias a class-validator
    return this.emailService.sendMail(to, subject, template, context);
  }

  @Post('pushSendNotification')
  async pushSendNotification(@Body() sendEmailDto: SendPushNotificationDto) {
    const { token, mensaje, title } = sendEmailDto;
    // Aquí validas el DTO automáticamente gracias a class-validator
    return this.pushNoti.sendPushNotification(token,mensaje,title);
  }
}
