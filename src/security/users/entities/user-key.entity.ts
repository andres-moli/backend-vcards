import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';
import { User } from './user.entity';

@Entity({ name: 'sec_user_key' })
@ObjectType()
export class UserKey extends CrudEntity {
  @Column()
  @Field(() => String)
  code: string;

  @Column()
  @Field(() => String, )
  expirationCode: string;

  @Column()
  @Field(() => String, )
  origin: string;

  @ManyToOne( () => User, (user) => user.id ,{ lazy: true, nullable: true})  
  @Field(() => User, {nullable: true}) 
  user: User;
}
