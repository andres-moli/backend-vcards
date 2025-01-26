import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from '@nestjs/class-transformer';

@InputType()
export class RecoverPasswordInput {
  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
