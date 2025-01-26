import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { City } from '../entities/city.entity';
import { cityEvent } from '../../../security/auth/constants/events.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { FindCitiesArgs } from '../dto/args/find-cities.arg';
import { OrderByTypes } from '../../../patterns/crud-pattern/enums/order-by-type.enum';

@Injectable()
export class CityService {
    constructor (
        @InjectRepository(City) 
        private readonly cityRepo:Repository<City>
    ) {}

    async city(context: IContext, id: string, departmentId: string): Promise <City>{
        const entity = await this.cityRepo.findOne({
            where: {
                id,
                department: {
                    id: departmentId
                }
            }
        });

        if (!entity)
            throw new NotFoundException(`object with id: ${id} not found`);

        return entity;
    }
    async cityOne(context: IContext, id: string, orFaill?: boolean): Promise <City>{
        const entity = await this.cityRepo.findOne({
            where: {
                id
            }
        });

        if (!entity && orFaill)
            throw new NotFoundException(`object with id: ${id} not found`);

        return entity;
    }

    async cities(context: IContext, args: FindCitiesArgs): Promise <City[]>{
        const { departmentId, orderBy } = args;

        const cities = departmentId ? await this.cityRepo.findBy([
            {
                department: {
                    id: departmentId
                }
            }
        ]) : await this.cityRepo.find()

        let orderedCities;

        if(orderBy){
            orderedCities = cities.sort((a, b) => {
              return orderBy === OrderByTypes.ASC ? a.name?.localeCompare(b.name) : b.name?.localeCompare(a.name);
            });
      
        } else {
        orderedCities = cities;
        }
        
        return orderedCities
    }

    @OnEvent(cityEvent)
    async onCountry({
      context,
      cityId,
      departmentId,
    }: {
      context: IContext;
      cityId: string;
      departmentId: string;
    }): Promise<City> {
      return await this.city(context, cityId, departmentId);
    }
}