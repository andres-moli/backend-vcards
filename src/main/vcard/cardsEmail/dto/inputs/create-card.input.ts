import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCardEmailInput {
  @IsString()
  @Field(()=> String)
  email: string;
  
  @IsString()
  @IsOptional()
  @Field(()=> String,{nullable: true})
  title?: string;

  @IsString()
  @IsOptional()
  @Field(()=> String,{nullable: true})
  icono?: string;
  
  @IsString()
  @IsOptional()
  @Field(() => ID, {nullable: true})
  cardId?: string;

}
