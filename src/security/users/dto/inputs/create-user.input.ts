import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { UserTypes } from '../../enums/user-type.enum';
import { UserDocumentTypes } from '../../../../common/enum/document-type.enum';
import { Transform } from "class-transformer";
import { CustomPasswordScalar } from '../../scalars/password.scalar';
import { PersonTypes } from 'src/common/enum/person-type.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name:string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  lastName:string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  dateOfBirth: Date

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => CustomPasswordScalar)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => UserDocumentTypes)
  @IsNotEmpty()
  identificationType:UserDocumentTypes;

  @Field(() => String)
  @IsNotEmpty()
  @IsNumber()
  identificationNumber: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field(() => UserTypes)
  type:UserTypes;

  @Field(() => ID, {nullable: true})
  @IsString()
  @IsOptional()
  fileId?: string

  @Field(() => String, { nullable:true})
  @IsOptional()
  @IsString()
  tokenExpoNotification: string;
}
