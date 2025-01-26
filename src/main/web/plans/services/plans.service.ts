import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';
import { WebPlans } from '../entities/plans.entity';
import { CreatePlanInput } from '../dto/inputs/create-plan.input';
import { UpdatePlanInput } from '../dto/inputs/update-plan.input';
import { FindPlanArgs } from '../dto/args/find-plans.args';

export const serviceStructure = CrudServiceStructure({
  entityType: WebPlans,
  createInputType: CreatePlanInput,
  updateInputType: UpdatePlanInput,
  findArgsType: FindPlanArgs,
});

@Injectable()
export class PlansService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly filesService: FilesService,
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<WebPlans>, entity: WebPlans, createInput: CreatePlanInput): Promise<void> {
    entity.imgen = await this.filesService.findOne(context,createInput.fileId,true)
  }
}
