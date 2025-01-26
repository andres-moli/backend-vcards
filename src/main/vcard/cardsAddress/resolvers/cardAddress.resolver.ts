import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AdminOnly, AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CardsAddressService, serviceStructure } from '../services/cardAddres.service';
import { CardsAddress } from '../entities/CardsAddress.entity';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: CardsAddressService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCardAddres",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCardAddres",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCardAddres",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"CardAddres",
            decorators:[Public], 
      },
      findAll: { 
            name: "CardAddreses" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CardsAddress)
export class CardsAddressResolver extends CrudResolverFrom(resolverStructure) {
}
