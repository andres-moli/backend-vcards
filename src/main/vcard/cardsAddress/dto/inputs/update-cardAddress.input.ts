import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCardAddressInput } from './create-cardAddress.input';

@InputType()
export class UpdateCardAddressInput extends PartialType(CreateCardAddressInput) {
  @Field(() => ID)
  id: string;
}
