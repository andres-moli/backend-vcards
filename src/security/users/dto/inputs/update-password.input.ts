import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from '@nestjs/class-transformer';
import { CustomPasswordScalar } from '../../scalars/password.scalar';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  token: string;

  @Field(() => CustomPasswordScalar)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => CustomPasswordScalar)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
