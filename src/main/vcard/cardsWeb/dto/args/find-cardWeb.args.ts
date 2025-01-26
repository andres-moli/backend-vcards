import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { NumberFilter } from 'src/patterns/crud-pattern/classes/inputs/number-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';


@InputType({ isAbstract: true })
class FindCardWebWhere {
  @Field(() => StringFilter)
  title: StringFilter;
  
  @Field(() => StringFilter)
  web: StringFilter;

  @Field(() => DateFilter)
  createdAt: DateFilter

  @Field(() => StringFilter)
  card: StringFilter;
}

@InputType({ isAbstract: true })
class FindCardWebOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
  
}

@ArgsType()
export class FindCardWebArgs extends FindArgs(
  FindCardWebWhere,
  FindCardWebOrderBy,
) {
}
