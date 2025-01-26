import { UseGuards } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { SecurityAuthGuard } from "../guards/auth.guard";
import { IDataEntity } from "../../../patterns/crud-pattern/interfaces/data-entity.interface";
import { ICrudService } from "../../../patterns/crud-pattern/interfaces/crud-service.interface";
import { DefaultArgs } from "../../../patterns/crud-pattern/classes/args/default.args";
import { IFindArgs } from "../../../patterns/crud-pattern/interfaces/find-args.interface";
import { IContext } from "../../../patterns/crud-pattern/interfaces/context.interface";
import { ICrudResolverStructure } from "../../../patterns/crud-pattern/interfaces/structures/crud-resolver-structure.inteface";

export function CrudResolverStructure<
                        PrimaryKeyType,
                        EntityType extends IDataEntity<PrimaryKeyType>,
                        CreateInputType extends DeepPartial<EntityType>,
                        UpdateInputType extends DeepPartial<EntityType>,
                        ServiceType extends ICrudService<PrimaryKeyType,EntityType,CreateInputType,UpdateInputType,FindArgsType,ContextType>,
                        FindArgsType extends IFindArgs = DefaultArgs,
                        ContextType extends IContext = IContext,
                        >(input:ICrudResolverStructure<PrimaryKeyType,EntityType,CreateInputType,UpdateInputType,ServiceType,FindArgsType,ContextType>):ICrudResolverStructure<PrimaryKeyType,EntityType,CreateInputType,UpdateInputType,ServiceType,FindArgsType,ContextType>
                        {
                            return {
                                ...input,
                                classDecorators:[
                                    () => UseGuards(SecurityAuthGuard),
                                    ...(input.classDecorators??[]),
                                ]
                            };
                        }