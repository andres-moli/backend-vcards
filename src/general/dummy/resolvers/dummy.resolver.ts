import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DummyService, serviceStructure } from '../services/dummy.service';
import { Dummy } from '../entities/dummy.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Translations } from '../../../common/i18n/translation';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { CurrentContext } from '../../../patterns/crud-pattern/decorators/current-context.decorator';
import { Public } from '../../../security/auth/decorators/public.decorator';
import { Transactional } from '../../../patterns/crud-pattern/decorators/transactional.decorator';
import { CrudResolverFrom } from '../../../patterns/crud-pattern/mixins/crud-resolver.mixin';
import { AdminOnly, SuperAdminOnly } from '../../../security/auth/decorators/user-types.decorator';
import { CrudResolverStructure } from '../../../security/auth/utils/crud.utils';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:DummyService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createDummy",
            decorators:[AdminOnly],
      },
      update:{ 
            name:"updateDummy",
            decorators:[AdminOnly],
      },
      remove:{ 
            name:"removeDummy",
            decorators:[SuperAdminOnly],
      },
      findOne: { 
            name:"dummy",
            decorators:[Public], 
      },
      findAll: { 
            name: "dummies" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Dummy)
export class DummyResolver extends CrudResolverFrom(resolverStructure) {
  /*
      @Query((returns) => [Dummy],{ name:'dummiesX' })
      @Public()
      async findX(
            //@Args() args:FindDummiesArgs,
            @Args(undefined,{ type:() => FindDummiesArgs }) args:any,//:FindDummiesArgs,
            //@Args() args,
            @CurrentContext() context: IContext,
      ): Promise<Dummy[]>{                  
            return this.service.testQuery(context,args);
      }
      */

      @Mutation((returns) => [Dummy], { name: 'createDummiesX' })
      @Public()
      @Transactional()
      async createBatch(@CurrentContext() context: IContext): Promise<Dummy[]> {
    const service = this.service;

    const dummies: Dummy[] = [];

              dummies.push(
                await service.create(context, {
                  firstField: 'primero',
                  secondField: new Date(2023, 1, 1),
                  thirdField: 1,
                }),
              );

              dummies.push(
                await service.create(context, {
                  firstField: 'segundo',
                  secondField: new Date(2023, 1, 2),
                  thirdField: 2,
                }),
              );

              //throw new InternalServerErrorException(`trn finished`);

              dummies.push(
                await service.create(context, {
                  firstField: 'tercero',
                  secondField: new Date(2023, 1, 3),
                  thirdField: 3,
                }),
              );

            throw new InternalServerErrorException(`trn finished`);

            dummies.push(await service.create(context,{ firstField:"tercero", secondField:new Date(2023,1,3), thirdField: 3 }) );


            return dummies;
      }
      
      @Mutation(() => String, { name: 'i18nTest' })
      @Public()
      async i18nTest(@I18n() i18n: I18nContext): Promise<string> {
        const message = new Translations().translateText(i18n, 'message', undefined);
        return message;
      }
}
