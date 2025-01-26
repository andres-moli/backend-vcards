import {
  Inject,
  Injectable,
  NotFoundException,
  Optional,
  Type,
  mixin,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { Constructable } from '../types/constructable.type';
import { IContext } from '../interfaces/context.interface';
import { IDataEntity } from '../interfaces/data-entity.interface';
import { IDataService } from '../interfaces/data-service.interface';
import { IAuditService } from '../interfaces/audit-service.interface';
import { IFindArgs } from '../interfaces/find-args.interface';
import { DefaultArgs } from '../classes/args/default.args';
import { QueryBuilderHelper } from '../helpers/QueryBuilder.helper';
import { MetadataPagination } from '../classes/args/metadata-pagination.args';
import { FilterableFieldInfo } from '../interfaces/filterable-field.interface';


export function DataService<
  PrimaryKeyType,
  EntityType extends IDataEntity<PrimaryKeyType>,
  FindArgsType extends IFindArgs = DefaultArgs,
  ContextType extends IContext = IContext,
  MetadataPaginationType extends MetadataPagination = MetadataPagination,
>(
  entityType: Constructable<EntityType>,
  findArgsType?: Constructable<FindArgsType>,
  contextType?: Constructable<ContextType>,
): Type<IDataService<PrimaryKeyType,EntityType, FindArgsType, ContextType>> {
  class QBHelper extends QueryBuilderHelper(entityType, findArgsType) {}

  @Injectable()
  class DataService
    implements IDataService<PrimaryKeyType,EntityType, FindArgsType, ContextType>
  {
    @Inject(IAuditService)
    @Optional()
    private readonly _auditService?: IAuditService;

    @InjectRepository(entityType)
    private readonly _repository: Repository<EntityType>;

    getRepository(context: ContextType) {
      if (context?.transactionManager)
        return context.transactionManager.getRepository(entityType);

      return this._repository;
    }

    getQueryBuilder(
      context: ContextType,
      args?: FindArgsType,
    ): SelectQueryBuilder<EntityType> {
      const repository = this.getRepository(context);
      return QBHelper.getQueryBuilder(repository, args);
    }

    async find(
      context: ContextType,
      options?: FindManyOptions<EntityType>,
    ): Promise<EntityType[]> {
      const repository = this.getRepository(context);
      return repository.find(options);
    }

    async findAll(
      context: ContextType,
      args?: FindArgsType,
    ): Promise<EntityType[]> {
      const queryBuilder = this.getQueryBuilder(context, args);

      return queryBuilder.getMany();
    }

    async Count(context: ContextType, args?: FindArgsType): Promise<MetadataPaginationType> {
      const queryBuilder = this.getQueryBuilder(context, {
        ...args,
        pagination: undefined,
        orderBy: undefined,
      });

      const totalItems = await queryBuilder.getCount();
      const itemsPerPage = args.pagination.take;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const currentPage = Math.ceil((args.pagination.skip + 1) / itemsPerPage);

      return {
        totalItems,
        itemsPerPage,
        totalPages,
        currentPage
      } as MetadataPaginationType;
    }

    async findOne(
      context: ContextType,
      id: PrimaryKeyType,
      orFail?: boolean,
    ): Promise<EntityType> {
      const repository = this.getRepository(context);

      const entity = await repository.findOneBy({
        id,
      } as FindOptionsWhere<EntityType>);

      if (orFail && !entity)
        throw new NotFoundException(`object with id: ${JSON.stringify(id)} not found`);

      return entity;
    }

    getFilterableFields(targetClass: any): FilterableFieldInfo[] {
      const filterableFields: FilterableFieldInfo[] = [];
  
      // Obtener todas las propiedades de la clase
      const propertyNames = Object.getOwnPropertyNames(targetClass.prototype);
  
      for (const propertyName of propertyNames) {
        // Obtener metadatos de Reflect y verificar si tiene el decorador FilterableField
        const isFilterable = !!Reflect.getMetadata(
          'graphql:filterableField',
          targetClass.prototype,
          propertyName,
        );
  
        filterableFields.push({
          propertyName,
          isFilterable,
        });
      }
  
      return filterableFields;
    }

    async Audit(
      context: ContextType,
      action: string,
      objectId?: PrimaryKeyType,
      valueBefore?: object,
      valueAfter?: object,
    ): Promise<void> {
      if (context.disableAudits) return;

      if (!this._auditService) return;

      const serviceName = this.constructor.name;

      this._auditService.Audit(
        context,
        serviceName,
        action,
        JSON.stringify(objectId),
        valueBefore,
        valueAfter,
      );
    }
  }

  return mixin(DataService);
}
