import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AdminOnly } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { PlansService, serviceStructure } from '../services/plans.service';
import { WebPlans } from '../entities/plans.entity';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: PlansService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createPlans",
            decorators:[AdminOnly],
      },
      update:{ 
            name:"updatePlans",
            decorators:[AdminOnly],
      },
      remove:{ 
            name:"removePlans",
            decorators:[AdminOnly],
      },
      findOne: { 
            name:"Plan",
            decorators:[Public], 
      },
      findAll: { 
            name: "Plans" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => WebPlans)
export class PlansResolver extends CrudResolverFrom(resolverStructure) {
}
