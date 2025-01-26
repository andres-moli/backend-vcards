import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FilesService } from 'src/general/files/services/files.service';
import { CardsAddress } from '../entities/CardsAddress.entity';
import { CreateCardAddressInput } from '../dto/inputs/create-cardAddress.input';
import { UpdateCardAddressInput } from '../dto/inputs/update-cardAddress.input';
import { FindCardAddressArgs } from '../dto/args/find-cardAddress.args';
import { CardsService } from '../../cards/services/card.service';
import { Cards } from '../../cards/entities/Cards.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: CardsAddress,
  createInputType: CreateCardAddressInput,
  updateInputType: UpdateCardAddressInput,
  findArgsType: FindCardAddressArgs,
});

@Injectable()
export class CardsAddressService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly cardService: CardsService,
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<CardsAddress>, entity: CardsAddress, createInput: CreateCardAddressInput): Promise<void> {
    if(createInput.cardId){
      entity.card = await this.cardService.findOne(context,createInput.cardId,true)
    }
  }
  async createTransaction(queryRunner: QueryRunner, card: Cards, addresses: CreateCardAddressInput[]){

    const addressToCreate = addresses.map(address => ({
      card,
      ...address,
    }));
    const newCard = this.getRepository({user: undefined}).create(addressToCreate);
    return await queryRunner.manager.save(newCard);
  }
}
