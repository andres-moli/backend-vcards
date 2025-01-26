import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';
import { CardsSocial } from '../entities/CardsSocial.entity';
import { CreateCardSocialInput } from '../dto/inputs/create-cardSocial.input';
import { UpdateCardSocialInput } from '../dto/inputs/update-cardSocial.input';
import { FindCardSocialArgs } from '../dto/args/find-cardSocial.args';
import { CardsService } from '../../cards/services/card.service';
import { Cards } from '../../cards/entities/Cards.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: CardsSocial,
  createInputType: CreateCardSocialInput,
  updateInputType: UpdateCardSocialInput,
  findArgsType: FindCardSocialArgs,
});

@Injectable()
export class CardsSocialService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly cardService: CardsService,
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<CardsSocial>, entity: CardsSocial, createInput: CreateCardSocialInput): Promise<void> {
    if(createInput.cardId){
      entity.card = await this.cardService.findOne(context,createInput.cardId,true)
    }
  }
  async createTransaction(queryRunner: QueryRunner,card: Cards, socials: CreateCardSocialInput[]){

    const socialToCreate = socials.map(social => ({
      card,
      ...social,
    }));
    const newCard = this.getRepository({user: undefined}).create(socialToCreate);
    return await queryRunner.manager.save(newCard);
  }
}
