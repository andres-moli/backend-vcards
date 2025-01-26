import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CrudServiceFrom } from "../../../patterns/crud-pattern/mixins/crud-service.mixin";
import { CrudServiceStructure } from "../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface";
import { Parameter } from "../entities/parameter.entity";
import { CreateParametersInput } from "../dto/create-entity.inpit";
import { UpdateParametersInput } from "../dto/update-entity.input";
import { IContext } from "src/patterns/crud-pattern/interfaces/context.interface";
import { Repository } from "typeorm";
import { TypeParameterEnum } from "../emun/type-parameter.enum";
import { FilesService } from "src/general/files/services/files.service";
import { FindParameterArgs } from "../dto/arg/find-paramter.args";



export const serviceStructure = CrudServiceStructure({
    entityType:Parameter,
    findArgsType: FindParameterArgs,
    createInputType:CreateParametersInput,
    updateInputType:UpdateParametersInput,
  })

@Injectable()
export class ParameterService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly filesService: FilesService,
  ){super();}
  async beforeCreate(context: IContext, repository: Repository<Parameter>, entity: Parameter, createInput: CreateParametersInput): Promise<void> {
    const findOldCode = await repository.findOne({
      where: {
        codigo: createInput.codigo,
      }
    })
    if(findOldCode) throw Error(`Ya existe un codigo con este codigo - [${createInput.codigo}]`)
    if(createInput.type == TypeParameterEnum.file && createInput.valueFileId){
      entity.valueFile = await this.filesService.findOne(context, createInput.valueFileId,true);
    }
  }
  async getHoursCompany(context: IContext, id: string,){
    const hoursOpen = await this.findOneCodigo<number>(context, 'HOURS-OPEN') || 8;
    const hoursClose = await this.findOneCodigo<number>(context, 'HOURS-CLOSE') || 20;
    return {
      hoursOpen,
      hoursClose
    }
  }

  async findOneCodigo<T>(context: IContext, codigo: string, orFaile: boolean = false){
    const repository = this.getRepository(context)
    if(!codigo) throw new Error(`the code cannot come null`)
    const findOne = await repository.findOne({
      where: {
        codigo: codigo
      }
    })
    if(!findOne && orFaile) throw new Error(`not found parameter by code - [${codigo}]`)
    if(!findOne) return null
    switch(findOne.type){
      case TypeParameterEnum.date:
        return findOne.valueDate as T
      case TypeParameterEnum.number:
        return findOne.valueInt  as T
      case TypeParameterEnum.string:
        return findOne.valueString  as T
      case TypeParameterEnum.file:
        return await findOne.valueFile as T
    }
  }
}