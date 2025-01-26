import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { TypeParameterEnum } from "../emun/type-parameter.enum";

@InputType()
export class CreateParametersInput {

    @Field(() => String, { nullable: true })
    @IsString()
    name: string

    @Field(() => ID)
    @IsString()
    companyId: string

    @Field(() => String)
    codigo: string;

    @Field(() => String)
    descripcion: string;

    @Field(()=> TypeParameterEnum)
    type: TypeParameterEnum

    @Field(() => Float, {nullable: true})
    valueInt?: number;

    @Field(() => String, {nullable: true})
    valueString?: string;

    @Field(() => Date, {nullable: true})
    valueDate?: Date;

    @Field(() => ID, {nullable: true})
    valueFileId?: string;
}