import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AdminOnly, AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CardsService, serviceStructure } from '../services/card.service';
import { Cards } from '../entities/Cards.entity';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: CardsService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCards",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCards",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCards",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"Card",
            decorators:[Public], 
      },
      findAll: { 
            name: "Cards" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Cards)
export class CardsResolver extends CrudResolverFrom(resolverStructure) {
}
