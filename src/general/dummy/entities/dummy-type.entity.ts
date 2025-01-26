import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';

@Entity({ name:'grl_dummyType'})
@ObjectType()
export class DummyType extends CrudEntity {

  @Column()
  @Field(() => String)
  name:string;

}
