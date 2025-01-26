import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';
import { CardsWeb } from '../entities/CardsWeb.entity';
import { CreateCardWebInput } from '../dto/inputs/create-cardWeb.input';
import { UpdateCardWebInput } from '../dto/inputs/update-cardWeb.input';
import { FindCardWebArgs } from '../dto/args/find-cardWeb.args';
import { CardsService } from '../../cards/services/card.service';
import { Cards } from '../../cards/entities/Cards.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: CardsWeb,
  createInputType: CreateCardWebInput,
  updateInputType: UpdateCardWebInput,
  findArgsType: FindCardWebArgs,
});

@Injectable()
export class CardsWebService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly cardService: CardsService,
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<CardsWeb>, entity: CardsWeb, createInput: CreateCardWebInput): Promise<void> {
    if(createInput.cardId){
      entity.card = await this.cardService.findOne(context,createInput.cardId,true)
    }
  }
  async createTransaction(queryRunner: QueryRunner,card: Cards, webs: CreateCardWebInput[]){
    const webToCreate = webs.map(web => ({
      card,
      ...web,
    }));
    const newCard = this.getRepository({user: undefined}).create(webToCreate);
    return await queryRunner.manager.save(newCard);
  }
}
