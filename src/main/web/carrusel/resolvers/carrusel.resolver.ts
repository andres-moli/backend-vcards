import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { CarruselService, serviceStructure } from '../services/carrusel.service';
import { AdminOnly } from 'src/security/auth/decorators/user-types.decorator';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { WebCarrusel } from '../entities/carrusel.entity';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';


export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: CarruselService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCarrusel",
            decorators:[AdminOnly],
      },
      update:{ 
            name:"updateCarrusel",
            decorators:[AdminOnly],
      },
      remove:{ 
            name:"removeCarrusel",
            decorators:[AdminOnly],
      },
      findOne: { 
            name:"Carrusel",
            decorators:[Public], 
      },
      findAll: { 
            name: "Carrusels" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => WebCarrusel)
export class CarruselResolver extends CrudResolverFrom(resolverStructure) {
}
