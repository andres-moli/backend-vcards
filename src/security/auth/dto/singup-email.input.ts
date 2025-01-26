import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from '@nestjs/class-transformer';
import { CustomPasswordScalar } from '../../users/scalars/password.scalar';

@InputType()
export class SignupEmailInput {
  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => CustomPasswordScalar)
  @IsNotEmpty()
  @IsString()
  password:string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  confirmationPassword: string;
}