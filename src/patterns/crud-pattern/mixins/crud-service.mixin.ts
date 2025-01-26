import { Injectable, Type, mixin } from "@nestjs/common";
import { DeepPartial, MaxKey, MissingDeleteDateColumnError, Repository } from "typeorm";

import { getAutoIncrementKey } from "../decorators/auto-increment.decorator";
import { IContext } from "../interfaces/context.interface";
import { IDataEntity } from "../interfaces/data-entity.interface";
import { ICrudService } from "../interfaces/crud-service.interface";
import { Constructable } from "../types/constructable.type";
import { ICreateEventsHandler, IRemoveEventsHandler, IUpdateEventsHandler } from "../interfaces/event-handlers";
import { ICrudServiceStructure } from "../interfaces/structures/crud-service-structure.interface";
import { DataService } from "./data-service.mixin";
import { StandardActions } from "../enums/standard-actions.enum";
import { IFindArgs } from "../interfaces/find-args.interface";
import { DefaultArgs } from "../classes/args/default.args";

export function CrudServiceFrom<
            PrimaryKeyType,
            EntityType extends IDataEntity<PrimaryKeyType>,
            CreateInputType extends DeepPartial<EntityType>,
            UpdateInputType extends DeepPartial<EntityType>,
            FindArgsType extends IFindArgs = DefaultArgs,
            ContextType extends IContext = IContext
            >(
                structure:ICrudServiceStructure<PrimaryKeyType,EntityType,CreateInputType,UpdateInputType,FindArgsType,ContextType>
            ) : Type<ICrudService<PrimaryKeyType,EntityType,CreateInputType,UpdateInputType,FindArgsType,ContextType>>
    {
        const { entityType,createInputType,updateInputType,contextType,findArgsType } = structure;

        return CrudService(entityType,createInputType,updateInputType,findArgsType,contextType);
    }

export function 
    CrudService<
        PrimaryKeyType,
        EntityType extends IDataEntity<PrimaryKeyType>,
        CreateInputType extends DeepPartial<EntityType>,
        UpdateInputType extends DeepPartial<EntityType>,
        FindArgsType extends IFindArgs = DefaultArgs,
        ContextType extends IContext = IContext
    >(
        entityType: Constructable<EntityType>,
        createInputType:Constructable<CreateInputType>,
        updateInputType:Constructable<UpdateInputType>,
        findArgsType?: Constructable<FindArgsType>,
        contextType?: Constructable<ContextType>
    ): Type<ICrudService<PrimaryKeyType,EntityType,CreateInputType,UpdateInputType,FindArgsType,ContextType>> {

    @Injectable()
    class CrudService 
        extends DataService(entityType,findArgsType,contextType)
        implements ICrudService<PrimaryKeyType,EntityType,CreateInputType,UpdateInputType,FindArgsType,ContextType>{
      
        async create(
            context:ContextType,
            createInput: CreateInputType,
            eventHandler:ICreateEventsHandler<PrimaryKeyType,EntityType,CreateInputType,ContextType> = this
            ): Promise<EntityType> {
    
            const repository = this.getRepository(context);
    
            const entity = repository.create(createInput);
    
            await eventHandler.beforeCreate(context,repository,entity,createInput);
            
            const autoIncrementKey:string = getAutoIncrementKey(entityType);

            if(autoIncrementKey !== undefined)
                entity.id = await this.autoIncrement(context,repository,entity.id,autoIncrementKey);

            const responseEntity = await repository.save(entity);

            this.Audit(context,StandardActions.Create,entity.id,undefined,responseEntity);
    
            await eventHandler.afterCreate(context,repository,responseEntity,createInput);
    
            return responseEntity;
        }

        async autoIncrement(context:ContextType,repository: Repository<EntityType>,primaryKey:PrimaryKeyType,autoincrementKey:string):Promise<PrimaryKeyType>
        {
            let val:number;

            if(typeof(primaryKey) !== "object")
            {
                val = (await repository.createQueryBuilder("tt").select(`MAX(tt.id)`, "max").getRawOne<{ max:number }>()).max; 
            }
            else
            {
                delete primaryKey[autoincrementKey];

                val = (await repository.createQueryBuilder("tt").where({ id:primaryKey }).select(`MAX(tt.id.${autoincrementKey})`, "max").getRawOne<{ max:number }>()).max;  
            }

            primaryKey[autoincrementKey] = (val ?? 0) + 1;

            return primaryKey;
        }
    
        async update(
            context:ContextType,
            id: PrimaryKeyType, 
            updateInput: UpdateInputType,
            eventHandler:IUpdateEventsHandler<PrimaryKeyType,EntityType,UpdateInputType,ContextType> = this
            ): Promise<EntityType> {
            const repository = this.getRepository(context);
    
            const entity = await this.findOne(context,id,true);

            const entityBefore = { ...entity };
    
            Object.assign(entity,updateInput);
    
            await eventHandler.beforeUpdate(context,repository,entity,updateInput);
    
            const responseEntity = await repository.save(entity);

            this.Audit(context,StandardActions.Update,entity.id,entityBefore,responseEntity);            
    
            await eventHandler.afterUpdate(context,repository,responseEntity,updateInput);
    
            return responseEntity;
        } 
    
        async remove(
            context:ContextType,
            id: PrimaryKeyType,
            eventHandler:IRemoveEventsHandler<PrimaryKeyType,EntityType,ContextType> = this
            ): Promise<EntityType> {
            const repository = this.getRepository(context);
    
            const entity = await this.findOne(context,id,true);
    
            await eventHandler.beforeRemove(context,repository,entity);
    
            let responseEntity:EntityType;

            try{
                responseEntity = await repository.softRemove(entity);            
            }
            catch(error)
            {
                if(error instanceof MissingDeleteDateColumnError)
                    responseEntity = await repository.remove(entity);
                else
                    throw error;

                responseEntity.id = id;
            }
    
            await this.Audit(context,StandardActions.Remove,entity.id,responseEntity);   

            await eventHandler.afterRemove(context,repository,responseEntity);
    
            return responseEntity;
        }

        
    
        //these methos exists to be overriden 
        async beforeCreate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,createInput: CreateInputType) : Promise<void>
        { }
        async beforeUpdate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,updateInput: UpdateInputType) : Promise<void>
        { }
        async beforeRemove(context:ContextType,repository: Repository<EntityType>,entity: EntityType) : Promise<void>
        { }
    
        async afterCreate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,createInput: CreateInputType) : Promise<void>
        { }
        async afterUpdate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,updateInput: UpdateInputType) : Promise<void>
        { }
        async afterRemove(context:ContextType,repository: Repository<EntityType>,entity: EntityType) : Promise<void>
        { }

        
    }

    return mixin(CrudService);
}