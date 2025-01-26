import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AdminOnly, AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CardsWebService, serviceStructure } from '../services/cardWeb.service';
import { CardsWeb } from '../entities/CardsWeb.entity';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: CardsWebService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCardWeb",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCardWeb",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCardWeb",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"CardWeb",
            decorators:[Public], 
      },
      findAll: { 
            name: "CardWebs" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CardsWeb)
export class CardsWebResolver extends CrudResolverFrom(resolverStructure) {
}
