import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { StringFilter } from "../../../../patterns/crud-pattern/classes/inputs/string-filter.input";
import { FindArgs } from "../../../../patterns/crud-pattern/mixins/find-args.mixin";

@InputType({ isAbstract:true })
class FindDummyFamilyWhere {
    @Field()
    name:StringFilter;

    @Field()
    title:StringFilter;

    @Field()
    description:StringFilter;
}

@ArgsType()
export class FindDummyFamilyArgs extends FindArgs(FindDummyFamilyWhere){

}
