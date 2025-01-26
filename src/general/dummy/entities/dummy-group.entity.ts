import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DummyFamily } from './dummy-family.entity';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';

@Entity({ name:'grl_dummyGroup'})
@ObjectType()
export class DummyGroup extends CrudEntity {

  @Column()
  @Field(() => String)
  name:string;

  @Column()
  @Field(() => String)
  title:string;

  @ManyToOne( () => DummyFamily,undefined,{ lazy: true })  
  @Field(() => DummyFamily,{ nullable:true }) 
  family?:DummyFamily;
}
