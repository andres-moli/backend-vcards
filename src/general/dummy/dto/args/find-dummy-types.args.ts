import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { StringFilter } from "../../../../patterns/crud-pattern/classes/inputs/string-filter.input";
import { FindArgs } from "../../../../patterns/crud-pattern/mixins/find-args.mixin";

@InputType({ isAbstract:true })
class FindDummyTypeWhere {
    @Field()
    name:StringFilter;
}

@ArgsType()
export class FindDummyTypeArgs extends FindArgs(FindDummyTypeWhere){

}
