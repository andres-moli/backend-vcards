import { IsString, IsArray, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty
import { ISendMailContext } from '../interface/email.interface';

export class SendEmailDto {
  @ApiProperty({
    description: 'Destinatarios del correo electrónico. Debe ser una lista de direcciones de correo.',
    example: ['email1@example.com', 'email2@example.com'],
  })
  @IsString()
  to: string; // Lista de destinatarios del correo electrónico

  @ApiProperty({
    description: 'Asunto del correo electrónico.',
    example: 'Bienvenido a nuestro servicio',
  })
  @IsString()
  subject: string; // Asunto del correo

  @ApiProperty({
    description: 'Nombre o identificador del template de correo a utilizar.',
    example: 'welcome_template',
  })
  @IsString()
  template: string; // Nombre o identificador del template

  @ApiProperty({
    description: 'Información dinámica que se usará en el template.',
    example: { username: 'Juan', confirmationLink: 'https://example.com/confirm' },
    required: false, // Es opcional
  })
  @IsObject()
  @IsOptional()
  context: ISendMailContext; // Información dinámica que se usará en el template
}
export class SendPushNotificationDto {
  @ApiProperty({
    description: 'Destinatarios del correo electrónico. Debe ser una lista de direcciones de correo.',
    example: '2fj2n2224',
  })
  @IsString()
  token: string; // Lista de destinatarios del correo electrónico

  @ApiProperty({
    description: 'Asunto del correo electrónico.',
    example: 'Bienvenido a nuestro servicio',
  })
  @IsString()
  mensaje: string; // Asunto del correo

  
  @ApiProperty({
    description: 'Asunto del correo electrónico.',
    example: 'Bienvenido a nuestro servicio',
  })
  @IsString()
  title: string; // Asunto del correo
}