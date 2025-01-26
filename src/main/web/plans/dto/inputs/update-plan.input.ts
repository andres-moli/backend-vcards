import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePlanInput } from './create-plan.input';

@InputType()
export class UpdatePlanInput extends PartialType(CreatePlanInput) {
  @Field(() => ID)
  id: string;
}
