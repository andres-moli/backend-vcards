import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCardInput } from './create-card.input';

@InputType()
export class UpdateCardInput extends PartialType(CreateCardInput) {
  @Field(() => ID)
  id: string;
}
