import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { FileInfo } from 'src/general/files/entities/file-info.entity';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { User } from 'src/security/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cards } from '../../cards/entities/Cards.entity';

@Entity({name: 'vc_cardsSocial'})
@ObjectType()
export class CardsSocial extends CrudEntity{

  @Column({nullable: true })
  @Field({nullable: true})
  title?: string;

  @Column({length: 5000})
  @Field()
  url: string;

  @Column({length: 5000})
  @Field()
  typeSocial: string;

  @Column({ length: 255, nullable: true })
  @Field({nullable: true})
  icono?: string;

  @ManyToOne(() => Cards,(card)=> card.cardsSocial,{ lazy: true })  
  @Field(() => Cards) 
  card: Cards;

}
