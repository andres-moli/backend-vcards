import { IsString } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateCarruselInput } from './create-carrusel.input';

@InputType()
export class UpdateCarruselInput extends PartialType(CreateCarruselInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
