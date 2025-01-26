import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';


@InputType({ isAbstract: true })
class FindCarruselWhere {
  @Field(() => StringFilter)
  title: StringFilter;

  @Field(() => StringFilter)
  descripcion: StringFilter;
}

@InputType({ isAbstract: true })
class FindCarruselOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
}

@ArgsType()
export class FindCarruselArgs extends FindArgs(
  FindCarruselWhere,
  FindCarruselOrderBy,
) {
}
