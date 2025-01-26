import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { FindArgs, getWhereClass } from '../../../../patterns/crud-pattern/mixins/find-args.mixin';
import { StringFilter } from '../../../../patterns/crud-pattern/classes/inputs/string-filter.input';
import { DateFilter } from '../../../../patterns/crud-pattern/classes/inputs/date-filter.input';
import { NumberFilter } from '../../../../patterns/crud-pattern/classes/inputs/number-filter.input';
import { OrderByTypes } from '../../../../patterns/crud-pattern/enums/order-by-type.enum';

@InputType({ isAbstract: true })
class FindParameterWhere {
  @Field(() => StringFilter)
  type: StringFilter;

  @Field(() => DateFilter)
  company: StringFilter;

  @Field(() => StringFilter)
  descripcion: StringFilter;

}

@InputType({ isAbstract: true })
class FindParameterOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

}

@ArgsType()
export class FindParameterArgs extends FindArgs(
  FindParameterWhere,
  FindParameterOrderBy,
) {
}
