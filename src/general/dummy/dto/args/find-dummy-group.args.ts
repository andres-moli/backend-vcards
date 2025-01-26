import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { FindDummyFamilyArgs } from "./find-dummy-family.args";
import { FindArgs, getWhereClass } from "../../../../patterns/crud-pattern/mixins/find-args.mixin";
import { StringFilter } from "../../../../patterns/crud-pattern/classes/inputs/string-filter.input";

const FamilyWhere = getWhereClass(FindDummyFamilyArgs);

@InputType({ isAbstract:true })
class FindDummyGroupWhere {
    @Field()
    name:StringFilter;

    @Field()
    title:StringFilter;

    @Field(() => FamilyWhere)
    family;
}

@ArgsType()
export class FindDummyGroupArgs extends FindArgs(FindDummyGroupWhere){

}
