import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AdminOnly, AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CardsEmailService, serviceStructure } from '../services/card.service';
import { CardsEmails } from '../entities/CardsEmails.entity';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: CardsEmailService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCardsEmail",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCardsEmail",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCardsEmail",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"CardEmail",
            decorators:[Public], 
      },
      findAll: { 
            name: "CardsEmail" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CardsEmails)
export class CardsResolver extends CrudResolverFrom(resolverStructure) {
}
