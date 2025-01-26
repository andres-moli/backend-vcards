import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';
import { Cards } from '../entities/Cards.entity';
import { CreateCardInput } from '../dto/inputs/create-card.input';
import { UpdateCardInput } from '../dto/inputs/update-card.input';
import { FindCardArgs } from '../dto/args/find-card.args';
import { User } from 'src/security/users/entities/user.entity';
import { UsersService } from 'src/security/users/services/users.service';

export const serviceStructure = CrudServiceStructure({
  entityType: Cards,
  createInputType: CreateCardInput,
  updateInputType: UpdateCardInput,
  findArgsType: FindCardArgs,
});

@Injectable()
export class CardsService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<Cards>, entity: Cards, createInput: CreateCardInput): Promise<void> {
    if(createInput.imageProfileId){
      entity.imageProfile = await this.filesService.findOne(context,createInput.imageProfileId,true)
    }
    if(createInput.userId){
      entity.user = await this.usersService.findOne(context,createInput.userId,true)
    }
  }
  async createTransaction(queryRunner: QueryRunner, cardInput: CreateCardInput){
    const newCard = this.getRepository({user: undefined}).create(cardInput);
    return await queryRunner.manager.save(newCard);
  }
}
