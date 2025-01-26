import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AdminOnly, AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CardsSocialService, serviceStructure } from '../services/cardSocial.service';
import { CardsSocial } from '../entities/CardsSocial.entity';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: CardsSocialService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCardSocial",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCardSocial",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCardSocial",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"CardSocial",
            decorators:[Public], 
      },
      findAll: { 
            name: "CardSocials" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CardsSocial)
export class CardsSocialResolver extends CrudResolverFrom(resolverStructure) {
}
