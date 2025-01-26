import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class HoursCompanyModel {
  @Field(() => Float)
  hoursClose: number;

  @Field(() => Float)
  hoursOpen: number;
}
