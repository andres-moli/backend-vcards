import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCardEmailInput } from './create-card.input';

@InputType()
export class UpdateCardEmailInput extends PartialType(CreateCardEmailInput) {
  @Field(() => ID)
  id: string;
}
