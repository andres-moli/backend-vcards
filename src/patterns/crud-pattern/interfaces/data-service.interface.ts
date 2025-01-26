import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';

import { IDataEntity } from '../interfaces/data-entity.interface';
import { IContext } from '../interfaces/context.interface';
import { IFindArgs } from './find-args.interface';
import { DefaultArgs } from '../classes/args/default.args';
import { MetadataPagination } from '../classes/args/metadata-pagination.args';

export interface IDataService<
  PrimaryKeyType,
  EntityType extends IDataEntity<PrimaryKeyType>,
  FindArgsType extends IFindArgs = DefaultArgs,
  ContextType extends IContext = IContext,
  MetadataPaginationType extends MetadataPagination = MetadataPagination,
> {
  getRepository(context: ContextType): Repository<EntityType>;

  getQueryBuilder(
    context: ContextType,
    args?: FindArgsType,
  ): SelectQueryBuilder<EntityType>;

  find(
    context: ContextType,
    options?: FindManyOptions<EntityType>,
  ): Promise<EntityType[]>;

  findAll(context: ContextType, args?: FindArgsType): Promise<EntityType[]>;

  Count(context: ContextType, args?: FindArgsType): Promise<MetadataPaginationType>;

  findOne(
    context: ContextType,
    id: PrimaryKeyType,
    orFail?: boolean,
  ): Promise<EntityType>;

  Audit(
    context: ContextType,
    action: string,
    objectId?: PrimaryKeyType,
    valueBefore?: object,
    valueAfter?: object,
  ): Promise<void>;
}
