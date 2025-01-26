import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';
import { CardsPhones } from '../entities/CardsPhones.entity';
import { CreateCardPhoneInput } from '../dto/inputs/create-card.input';
import { UpdateCardPhoneInput } from '../dto/inputs/update-card.input';
import { FindCardPhoneArgs } from '../dto/args/find-cardPhone.args';
import { CardsService } from '../../cards/services/card.service';
import { Cards } from '../../cards/entities/Cards.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: CardsPhones,
  createInputType: CreateCardPhoneInput,
  updateInputType: UpdateCardPhoneInput,
  findArgsType: FindCardPhoneArgs,
});

@Injectable()
export class CardsPhoneService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly cardService: CardsService,
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<CardsPhones>, entity: CardsPhones, createInput: CreateCardPhoneInput): Promise<void> {
    if(createInput.cardId){
      entity.card = await this.cardService.findOne(context,createInput.cardId,true)
    }
  }
  async createTransaction(queryRunner: QueryRunner,card: Cards, phones: CreateCardPhoneInput[]){  
    const phoneToCreate = phones.map(phone => ({
      card,
      ...phone,
    }));
    const newCard = this.getRepository({user: undefined}).create(phoneToCreate);
    return await queryRunner.manager.save(newCard);
  }
}
