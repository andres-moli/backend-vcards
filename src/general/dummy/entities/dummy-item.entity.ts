import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Dummy } from './dummy.entity';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';

@Entity({ name:'grl_dummyItem'})
@ObjectType()
export class DummyItem extends CrudEntity {

  @Column()
  @Field(() => String)
  firstField:string;

  @Column()
  @Field(() => Date)
  secondField:Date;

  @Column({ type:'decimal', precision: 10, scale: 2 })
  @Field(() => Float)
  thirdField:number; 

  @Column({ type:'decimal', precision: 10 })
  @Field(() => Int)
  fourthField:number;  
  
  //@JoinColumn()
  @ManyToOne( () => Dummy,(dummy) => dummy.items,{ lazy: true })  
  @Field(() => Dummy)
  dummy:Dummy;
}
