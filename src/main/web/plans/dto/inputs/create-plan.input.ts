import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePlanInput {
  @IsString()
  @Field()
  title: string;
  
  @IsString()
  @Field()
  description: string;

  @IsString()
  @Field(() => ID)
  fileId: string;

  @IsString()
  @Field(() => ID)
  companyId: string;

  @IsString()
  @Field(()=> Date)
  expirationDate: Date

    
  @Field(() => Boolean)
  isActive: boolean;

}
