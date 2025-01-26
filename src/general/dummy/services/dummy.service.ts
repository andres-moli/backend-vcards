import { Injectable } from '@nestjs/common';
import { CreateDummyInput } from '../dto/inputs/create-dummy.input';
import { UpdateDummyInput } from '../dto/inputs/update-dummy.input';
import { Dummy } from '../entities/dummy.entity';
import { FindDummiesArgs } from '../dto/args/find-dummies.args';
import { CrudServiceStructure } from '../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from '../../../patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';

export const serviceStructure = CrudServiceStructure({
  entityType: Dummy,
  createInputType: CreateDummyInput,
  updateInputType: UpdateDummyInput,
  findArgsType: FindDummiesArgs,
});

@Injectable()
export class DummyService extends CrudServiceFrom(serviceStructure) {
  constructor(
  ){ super(); }

  /*
  async testQuery(context:IContext,args:FindDummiesArgs):Promise<Dummy[]>
  {
    const repository = this.getRepository(context);

    const qb = repository.createQueryBuilder('aa');

    qb.leftJoin('aa.type','aa1')
    qb.leftJoin('aa.group','aa2')
    qb.leftJoin('aa2.family','aa3')

    qb.where({ firstField:Like('prueba%') })
    qb.andWhere({ type:{ name:Like('prueba1') } })
    qb.andWhere(
      new Brackets(iqb => {
        (iqb as any).expressionMap.joinAttributes = (qb as any).expressionMap.joinAttributes;
        iqb.andWhere({ type:{ name:Like('prueba2%') } })
        iqb.andWhere({ group:{ title:Not(Like('prueba titulo')) } })
        iqb.andWhere(new Brackets(iqb2 => {
          (iqb2 as any).expressionMap.joinAttributes = (qb as any).expressionMap.joinAttributes;
          iqb2.andWhere({ group:{ family: {description: Like('%prueba descripcion') } } });
          iqb2.andWhere({ group:{ family: {title: Like('%prueba title') } } });          
        }))
      })
    )

    return qb.getMany();
  } 
  */
}
