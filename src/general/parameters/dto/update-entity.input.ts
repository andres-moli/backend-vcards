import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";
import { CreateParametersInput } from "./create-entity.inpit";

@InputType()
export class UpdateParametersInput extends PartialType(CreateParametersInput) {

  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
  
}
