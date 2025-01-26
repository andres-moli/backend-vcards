import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';

@Entity({ name:'grl_dummyFamily'})
@ObjectType()
export class DummyFamily extends CrudEntity {

  @Column()
  @Field(() => String)
  name:string;

  @Column()
  @Field(() => String)
  title:string;

  @Column()
  @Field(() => String)
  description:string;

}
