import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCardWebInput {
  @IsString()
  @Field()
  web: string;
  
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  title?: string;

  @IsString()
  @IsOptional()
  @Field({nullable: true})
  icono?: string;
  
  @IsString()
  @IsOptional()
  @Field(() => ID, {nullable: true})
  cardId?: string;

}
