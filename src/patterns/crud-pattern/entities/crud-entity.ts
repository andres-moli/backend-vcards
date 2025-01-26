import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IDataEntity } from "../interfaces/data-entity.interface";
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export abstract class CrudEntity implements IDataEntity<string> {
    
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id:string;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt!: Date;
  
    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt!: Date;
  
    @DeleteDateColumn()
    @Field(() => Date,{ nullable:true})
    deletedAt?: Date;  
}