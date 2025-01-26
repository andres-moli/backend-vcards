import { Field, Float, InputType } from "@nestjs/graphql";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDecimal, IsOptional } from "class-validator";


@InputType()
export class BooleanFilter {
    
    @Field(() => Boolean,{ nullable:true })
    @IsBoolean()    
    @IsOptional()
    _eq?:number

}