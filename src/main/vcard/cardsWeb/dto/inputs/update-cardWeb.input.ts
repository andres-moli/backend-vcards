import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCardWebInput } from './create-cardWeb.input';

@InputType()
export class UpdateCardWebInput extends PartialType(CreateCardWebInput) {
  @Field(() => ID)
  id: string;
}
