import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { CrudResolverFrom } from "../../../patterns/crud-pattern/mixins/crud-resolver.mixin";
import { CrudResolverStructure } from "../../../security/auth/utils/crud.utils";
import { AdminOnly, AnyUser } from "../../../security/auth/decorators/user-types.decorator";
import { Public } from "../../../security/auth/decorators/public.decorator";
import { Parameter } from "../entities/parameter.entity";
import { ParameterService, serviceStructure } from "../service/parameter.service";
import { HoursCompanyModel } from "../model/paramter.model";
import { IContext } from "src/patterns/crud-pattern/interfaces/context.interface";
import { CurrentContext } from "src/patterns/crud-pattern/decorators/current-context.decorator";


const resolverStructure = CrudResolverStructure({
    ...serviceStructure,
    serviceType:ParameterService,
    create:{ name:'createParameter', decorators:[AnyUser] },
    update:{ name:'updateParameter', decorators:[AnyUser] },
    remove:{ name:'removeParameter', decorators:[AnyUser] },
    findOne:{ name:'parameter', decorators:[Public] },
    findAll:{ name:'parameters', decorators:[Public] },
  })

@Resolver(() => Parameter)
export class ParameterResolver extends CrudResolverFrom(resolverStructure){
  @Public()
  @Query(()=> HoursCompanyModel)
  getHoursCompany(
    @Args('id', { type: () => ID }) id: string,
    @CurrentContext() context: IContext,
  ){
    return this.service.getHoursCompany(context, id);
  }
}

