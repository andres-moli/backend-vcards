import { IsString } from 'class-validator';
import { CreateDummyInput } from './create-dummy.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDummyInput extends PartialType(CreateDummyInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
