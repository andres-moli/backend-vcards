import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDummyInput {

  @Field(() => String)
  @IsString()
  firstField:string;

  @Field(() => Date)
  @IsDate()
  secondField:Date;

  @Field(() => Float)
  @IsDecimal()
  thirdField:number;

  @Field(() => String, {nullable: true})
  @IsEmail()
  @IsOptional()
  email?:string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  phone?:string;
}
