import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AdminOnly, AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CardsPhoneService, serviceStructure } from '../services/cardPhone.service';
import { CardsPhones } from '../entities/CardsPhones.entity';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: CardsPhoneService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCardPhone",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCardPhone",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCardPhone",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"CardPhone",
            decorators:[Public], 
      },
      findAll: { 
            name: "CardPhones" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CardsPhones)
export class CardsPhoneResolver extends CrudResolverFrom(resolverStructure) {
}
