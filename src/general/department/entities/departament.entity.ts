import { CrudEntity } from "../../../patterns/crud-pattern/entities/crud-entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from "../../../security/users/entities/user.entity";
import { ManyToOne } from "typeorm";
import { Country } from "../../country/entities/country.entity";

@Entity({ name:'grl_department'})
@ObjectType()
export class Department extends CrudEntity {

    @Column()
    @Field(() => Int)
    code: number;

    @Column({})
    @Field(() => String)
    name: string;

    @ManyToOne( () => Country,undefined,{ lazy: true })  
    @Field(() => Country, {nullable: true}) 
    country:Country;
}