import { Injectable } from '@nestjs/common';
import { CardsCreateInput } from './cardsCreate.input';
import { Cards } from '../cards/entities/Cards.entity';
import { CardsService } from '../cards/services/card.service';
import { CardsEmailService } from '../cardsEmail/services/card.service';
import { CardsPhoneService } from '../cardsPhone/services/cardPhone.service';
import { CardsSocialService } from '../cardsSocial/services/cardSocial.service';
import { CardsWebService } from '../cardsWeb/services/cardWeb.service';
import { CardsAddressService } from '../cardsAddress/services/cardAddres.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { DataSource } from 'typeorm';
import { FilesService } from 'src/general/files/services/files.service';

@Injectable()
export class CardsCreateService {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cardsEmail: CardsEmailService,
    private readonly cardsPhone: CardsPhoneService,
    private readonly cardsSocial: CardsSocialService,
    private readonly cardsWeb: CardsWebService,
    private readonly cardsAddress: CardsAddressService,
    private readonly dataSource: DataSource, 
  
  ){}

  async create(context: IContext, cardInput: CardsCreateInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // 1. Crear la tarjeta principal (Cards)
      const newCard = await this.cardsService.createTransaction(queryRunner, cardInput.card,cardInput.imageProfileId);

      // 2. Crear los emails asociados a la tarjeta
      await this.cardsEmail.createTransaction(queryRunner, newCard, cardInput.cardEmail);

      // 3. Crear los teléfonos asociados a la tarjeta
      await this.cardsPhone.createTransaction(queryRunner, newCard, cardInput.cardPhone);

      // 4. Crear las redes sociales asociadas a la tarjeta
      await this.cardsSocial.createTransaction(queryRunner, newCard, cardInput.cardSocial);

      // 5. Crear los sitios web asociados a la tarjeta
      await this.cardsWeb.createTransaction(queryRunner, newCard, cardInput.cardWeb);

      // 6. Crear las direcciones asociadas a la tarjeta
      await this.cardsAddress.createTransaction(queryRunner, newCard, cardInput.cardAddress);

      // Si todo va bien, confirmar la transacción
      await queryRunner.commitTransaction();
      return newCard;
    } catch (error) {
      // Si algo falla, hacer rollback de toda la transacción
      await queryRunner.rollbackTransaction();
      throw error;  // Re-throw el error para que sea capturado por el controlador o middleware
    } finally {
      // Liberar el query runner
      await queryRunner.release();
    }
  }
}
