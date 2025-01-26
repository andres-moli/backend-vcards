import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { CrudEntity } from "../../../patterns/crud-pattern/entities/crud-entity";
import { FileInfo } from "src/general/files/entities/file-info.entity";
import { TypeParameterEnum } from "../emun/type-parameter.enum";


@Entity({ name:'grl_parameter'})
@ObjectType()
export class Parameter extends CrudEntity {

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    codigo: string;

    @Column()
    @Field(() => String)
    descripcion: string;

    @Column()
    @Field(() => TypeParameterEnum)
    type: TypeParameterEnum;

    @Column({nullable: true, type: 'decimal'})
    @Field(() => Float, {nullable: true})
    valueInt?: number;

    @Column({nullable: true})
    @Field(() => String, {nullable: true})
    valueString?: string;

    @Column({nullable: true, type: 'timestamp'})
    @Field(() => Date, {nullable: true})
    valueDate?: Date;

    @ManyToOne( () => FileInfo, (file) => file.id ,{ lazy: true, nullable: true })  
    @Field(() => FileInfo, {nullable: true})
    valueFile?: FileInfo;
}