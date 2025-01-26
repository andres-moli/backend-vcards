import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCardSocialInput {
  @IsString()
  @Field()
  url: string;
  
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  title?: string;

  @IsString()
  @IsOptional()
  @Field({nullable: true})
  icono?: string;
  
  @IsString()
  @Field()
  typeSocial: string;

  @IsString()
  @IsOptional()
  @Field(() => ID, {nullable: true})
  cardId?: string;

}
