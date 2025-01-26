import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCardInput {
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  title: string;
  
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  description?: string;
  @IsString()
  @IsOptional()
  @Field({nullable: true})
  subTitle: string

  @IsString()
  @IsOptional()
  @Field({nullable: true})
  colorPrincipal?: string;

  @IsString()
  @IsOptional()
  @Field({nullable: true})
  colorSegundario?: string;

  @IsString()
  @IsOptional()
  @Field(() => ID, {nullable: true})
  imageProfileId?: string;
  
  @IsString()
  @IsOptional()
  @Field(() => ID, {nullable: true})
  userId?: string;

    
  @Field(() => Boolean)
  isActive: boolean;

}
