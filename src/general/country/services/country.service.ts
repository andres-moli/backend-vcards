import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { Country } from '../entities/country.entity';
import { countryEvent } from '../../../security/auth/constants/events.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { FindCountriesArgs } from '../dto/args/find-countries.arg';
import { OrderByTypes } from '../../../patterns/crud-pattern/enums/order-by-type.enum';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async country(context: IContext, id: string): Promise<Country> {
    const entity = await this.countryRepository.findOne({
      where: {
        id
      },
    });

    if (!entity) throw new NotFoundException(`object with id: ${id} not found`);

    return entity;
  }

  async countries(context: IContext, args: FindCountriesArgs): Promise<Country[]> {
    const countries = await this.countryRepository.find();

    const { orderBy } = args;

    let orderedCountries;

    if(orderBy){
      orderedCountries = countries.sort((a, b) => {
        return orderBy === OrderByTypes.ASC ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });

    } else {
      orderedCountries = countries;
    }

    return orderedCountries;
  }

  @OnEvent(countryEvent)
    async onCountry({
      context,
      countryId,
    }: {
      context: IContext;
      countryId: string;
    }): Promise<Country> {
      return await this.country(context, countryId);
  }
}
