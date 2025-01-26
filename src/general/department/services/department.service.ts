import { Injectable, NotFoundException } from '@nestjs/common';
import { Department } from '../entities/departament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { departmentEvent } from '../../../security/auth/constants/events.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { FindDepartmentsArgs } from '../dto/args/find-departments.arg';
import { OrderByTypes } from '../../../patterns/crud-pattern/enums/order-by-type.enum';

@Injectable()
export class DepartmentService {

    constructor (
        @InjectRepository(Department) 
        private readonly departmentRepo:Repository<Department>
    ) {}

    async department(context: IContext, id: string, countryId: string): Promise <Department>{
        const entity = await this.departmentRepo.findOne({
            where: {
                id,
                country: {
                    id: countryId
                }
            }
        });

        if (!entity)
            throw new NotFoundException(`object with id: ${id} not found`);

        return entity;
    }
    async departmentOne(context: IContext, id: string, orFaill?: boolean): Promise <Department>{
        const entity = await this.departmentRepo.findOne({
            where: {
                id
            }
        });

        if (!entity && orFaill)
            throw new NotFoundException(`object with id: ${id} not found`);

        return entity;
    }

    async departments(context: IContext, args: FindDepartmentsArgs): Promise <Department[]>{
        const { countryId, orderBy } = args;
        
        const departments = await this.departmentRepo.find({
            where: {
                country: {
                    id: countryId
                }
            }
        })

        let orderedDepartments;

        if(orderBy){
            orderedDepartments = departments.sort((a, b) => {
              return orderBy === OrderByTypes.ASC ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            });
      
        } else {
        orderedDepartments = departments;
        }
        
        return orderedDepartments
    }

    @OnEvent(departmentEvent)
    async onDepartment({
      context,
      departmentId,
      countryId,
    }: {
      context: IContext;
      departmentId: string;
      countryId: string;
    }): Promise<Department> {
      return await this.department(context, departmentId, countryId);
  }
}