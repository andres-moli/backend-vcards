import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WebCarrusel } from '../entities/carrusel.entity';
import { CreateCarruselInput } from '../dto/inputs/create-carrusel.input';
import { UpdateCarruselInput } from '../dto/inputs/update-carrusel.input';
import { FindCarruselArgs } from '../dto/args/find-carrusel.args';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';

export const serviceStructure = CrudServiceStructure({
  entityType: WebCarrusel,
  createInputType: CreateCarruselInput,
  updateInputType: UpdateCarruselInput,
  findArgsType: FindCarruselArgs,
});

@Injectable()
export class CarruselService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly filesService: FilesService 
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<WebCarrusel>, entity: WebCarrusel, createInput: CreateCarruselInput): Promise<void> {
    entity.imgen = await this.filesService.findOne(context,createInput.fileId,true)
  }
}
