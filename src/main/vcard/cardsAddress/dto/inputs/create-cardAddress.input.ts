import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCardAddressInput {
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  title: string;
  
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  websiteUrl?: string;

  @IsString()
  @IsOptional()
  @Field({nullable: true})
  city?: string;

  @IsString()
  @IsOptional()
  @Field({nullable: true})
  postalCode?: string;
  
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  country?: string;

  @IsString()
  @IsOptional()
  @Field({nullable: true})
  region?: string;

      
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  streetAddress?: string;
  
  @IsString()
  @IsOptional()
  @Field(() => ID, {nullable: true})
  cardId?: string;

}
