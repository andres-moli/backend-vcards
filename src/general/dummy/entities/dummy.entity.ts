import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DummyItem } from './dummy-item.entity';
import { DummyType } from './dummy-type.entity';
import { DummyGroup } from './dummy-group.entity';
import { FilterableField } from '../../../patterns/crud-pattern/decorators/filterable-field.decorator';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';

@Entity({ name:'grl_dummy'})
@ObjectType()
export class Dummy extends CrudEntity {

  @Column()
  @FilterableField(() => String)
  firstField:string;

  @Column()
  @Field(() => Date)
  secondField:Date;

  @Column({ type:'decimal', precision: 10, scale: 2 })
  @Field(() => Float)
  thirdField:number; 

  @Column({ nullable:true })
  @Field(() => String)
  email?:string;

  @Column({ nullable:true })
  @Field(() => String)
  phone?:string;

  @OneToMany( () => DummyItem,(item) => item.dummy,{ lazy: true })  
  @Field(() => [DummyItem])
  items:DummyItem[];

  @ManyToOne( () => DummyType,undefined,{ lazy: true })  
  @Field(() => DummyType,{ nullable:true }) 
  type?:DummyType;

  @ManyToOne( () => DummyGroup,undefined,{ lazy: true })  
  @Field(() => DummyGroup,{ nullable:true }) 
  group?:DummyGroup;
}
