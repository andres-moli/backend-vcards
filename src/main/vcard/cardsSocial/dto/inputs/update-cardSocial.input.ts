import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCardSocialInput } from './create-cardSocial.input';

@InputType()
export class UpdateCardSocialInput extends PartialType(CreateCardSocialInput) {
  @Field(() => ID)
  id: string;
}
