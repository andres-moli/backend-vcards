// mail/mail.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailContext } from '../interface/email.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject('EMAIL_QUEUE') private client: ClientProxy
  ) {}
  async sendMail(to: string | string[], subject: string, template: string, context: ISendMailContext) {
    const sendEmailDto = {
      to,
      subject, 
      template,
      context
    }
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: `./${template}`,
        context:context
      }).catch(e => {
        console.log(e)
      });
      // return await this.client.emit('send_email', sendEmailDto);
      return {success: true}
    }catch (e){
      console.log(e)
      // throw new Error('WBHDV' + e.message)
    }
  }
}
