import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { NumberFilter } from 'src/patterns/crud-pattern/classes/inputs/number-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';


@InputType({ isAbstract: true })
class FindCardWhere {
  @Field(() => StringFilter)
  title: StringFilter;
  
  @Field(() => StringFilter)
  descripcion: StringFilter;

  @Field(() => DateFilter)
  createdAt: DateFilter

  @Field(() => StringFilter)
  user: StringFilter;
  
  @Field(()=> NumberFilter)
  isActive: NumberFilter;
}

@InputType({ isAbstract: true })
class FindCardOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
  
}

@ArgsType()
export class FindCardArgs extends FindArgs(
  FindCardWhere,
  FindCardOrderBy,
) {
}
