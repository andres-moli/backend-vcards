import { Injectable } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Client, ClientProxy } from '@nestjs/microservices';
import nodemailer from 'nodemailer';
import { SendEmailDto } from '../dto/email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailProcessor {
    constructor(
        private readonly mailerService: MailerService,
    ){}
   

  @EventPattern('send_email')
  async handleSendEmail(@Payload() data: SendEmailDto) {
    const {context, subject, template, to} = data
    await this.mailerService.sendMail({
        to,
        subject,
        template: `./${template}`,
        context:context
      }).catch(e => {
        console.log(e)
      });
  }
}
