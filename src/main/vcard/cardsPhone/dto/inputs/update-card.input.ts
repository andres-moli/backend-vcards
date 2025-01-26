import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCardPhoneInput } from './create-card.input';

@InputType()
export class UpdateCardPhoneInput extends PartialType(CreateCardPhoneInput) {
  @Field(() => ID)
  id: string;
}
