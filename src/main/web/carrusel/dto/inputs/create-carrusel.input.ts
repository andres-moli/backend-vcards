import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCarruselInput {

  @Field(() => String)
  @IsString()
  title:string;

  @Field(() => String)
  @IsString()
  descripcion:string;

  @Field(() => String)
  @IsString()
  fileId:string;

  @Field(()=> String, {nullable: true})
  link?: string
}
