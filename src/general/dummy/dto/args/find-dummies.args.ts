import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { FindDummyTypeArgs } from './find-dummy-types.args';
import { FindDummyGroupArgs } from './find-dummy-group.args';
import { FindArgs, getWhereClass } from '../../../../patterns/crud-pattern/mixins/find-args.mixin';
import { StringFilter } from '../../../../patterns/crud-pattern/classes/inputs/string-filter.input';
import { DateFilter } from '../../../../patterns/crud-pattern/classes/inputs/date-filter.input';
import { NumberFilter } from '../../../../patterns/crud-pattern/classes/inputs/number-filter.input';
import { OrderByTypes } from '../../../../patterns/crud-pattern/enums/order-by-type.enum';

const TypeWhere = getWhereClass(FindDummyTypeArgs);

const GroupWhere = getWhereClass(FindDummyGroupArgs);

@InputType({ isAbstract: true })
class FindDummyWhere {
  @Field(() => StringFilter)
  firstField;

  @Field(() => DateFilter)
  secondField;

  @Field(() => NumberFilter)
  thirdField;

  @Field(() => TypeWhere)
  type;

  @Field(() => GroupWhere)
  group;
}

@InputType({ isAbstract: true })
class FindDummyOrderBy {
  @Field(() => OrderByTypes)
  firstField;

  @Field(() => OrderByTypes)
  secondField;

  @Field(() => OrderByTypes)
  thirdField;
}

@ArgsType()
export class FindDummiesArgs extends FindArgs(
  FindDummyWhere,
  FindDummyOrderBy,
) {
  // @Field()
  // forced:boolean;
}
