import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CardsCreateService } from './cardsCreate.service';
import { CardsCreateInput } from './cardsCreate.input';
import { Cards } from '../cards/entities/Cards.entity'; // Suponiendo que ya tienes un modelo Card (te lo explico abajo)
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';

@Resolver(() => Cards)
export class CardsCreateResolver {
  constructor(private readonly cardsCreateService: CardsCreateService) {}

  @Mutation(() => Cards)
  async createCardFull(
    @Args('input') input: CardsCreateInput,
    @CurrentContext() context: IContext,
  ): Promise<Cards> {
    return this.cardsCreateService.create(context,input);
  }
}
