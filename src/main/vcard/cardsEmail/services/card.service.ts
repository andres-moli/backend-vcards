import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';
import { CardsEmails } from '../entities/CardsEmails.entity';
import { CreateCardEmailInput } from '../dto/inputs/create-card.input';
import { UpdateCardEmailInput } from '../dto/inputs/update-card.input';
import { FindCardEmailArgs } from '../dto/args/find-card.args';
import { CardsService } from '../../cards/services/card.service';
import { Cards } from '../../cards/entities/Cards.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: CardsEmails,
  createInputType: CreateCardEmailInput,
  updateInputType: UpdateCardEmailInput,
  findArgsType: FindCardEmailArgs,
});

@Injectable()
export class CardsEmailService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly cardService: CardsService,
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<CardsEmails>, entity: CardsEmails, createInput: CreateCardEmailInput): Promise<void> {
    if(createInput.cardId){
      entity.card = await this.cardService.findOne(context,createInput.cardId,true)
    }
  }
  async createTransaction(queryRunner: QueryRunner,card: Cards, emails: CreateCardEmailInput[]){
    const emailsToCreate = emails.map(email => ({
      card,
      ...email,
    }));
    const newCard = this.getRepository({user: undefined}).create(emailsToCreate);
    return await queryRunner.manager.save(newCard);
  }
}
