import { CrudEntity } from "../../../patterns/crud-pattern/entities/crud-entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Department } from "../../department/entities/departament.entity";
import { User } from "../../../security/users/entities/user.entity";

@Entity({ name:'grl_city'})
@ObjectType()
export class City extends CrudEntity {

    @Column()
    @Field(() => Int)
    code: number;

    @Column()
    @Field(() => String)
    name: string;

    @ManyToOne( () => Department,undefined,{ lazy: true })  
    @Field(() => Department, { nullable: true }) 
    department:Department;
}