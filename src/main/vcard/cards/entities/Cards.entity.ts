import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { FileInfo } from 'src/general/files/entities/file-info.entity';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { User } from 'src/security/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CardsEmails } from '../../cardsEmail/entities/CardsEmails.entity';
import { CardsPhones } from '../../cardsPhone/entities/CardsPhones.entity';
import { CardsWeb } from '../../cardsWeb/entities/CardsWeb.entity';
import { CardsSocial } from '../../cardsSocial/entities/CardsSocial.entity';
import { CardsAddress } from '../../cardsAddress/entities/CardsAddress.entity';

@Entity({name: 'vc_cards'})
@ObjectType()
export class Cards extends CrudEntity{

  @Column({ length: 5000, nullable: true })
  @Field({nullable: true})
  title?: string;

  @Column({length: 5000, nullable: true})
  @Field({nullable: true})
  description?: string;

  @Column({ length: 5000,nullable: true })
  @Field({nullable: true})
  subTitle?:string; 

  @Column({ length: 255, nullable: true })
  @Field({nullable: true})
  colorPrincipal?: string;

  @Column({ length: 255,nullable: true })
  @Field({nullable: true})
  colorSegundario?: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @ManyToOne( () => FileInfo,undefined,{ lazy: true })  
  @Field(() => FileInfo,{ nullable:true }) 
  imageProfile?: FileInfo;

  @ManyToOne( () => User,undefined,{ lazy: true })  
  @Field(() => User,{ nullable:true }) 
  user?: User;

  @OneToMany( () => CardsEmails,(item) => item.card,{ lazy: true })  
  @Field(() => [CardsEmails])
  cardsEmails:CardsEmails[];

  @OneToMany( () => CardsPhones,(item) => item.card,{ lazy: true })  
  @Field(() => [CardsPhones])
  cardsPhones:CardsPhones[];

  @OneToMany( () => CardsWeb,(item) => item.card,{ lazy: true })  
  @Field(() => [CardsWeb])
  cardsWeb: CardsWeb[];

  @OneToMany( () => CardsSocial,(item) => item.card,{ lazy: true })  
  @Field(() => [CardsSocial])
  cardsSocial: CardsSocial[];

  @OneToMany( () => CardsAddress,(item) => item.card,{ lazy: true })  
  @Field(() => [CardsAddress])
  cardsAddress: CardsAddress[];

}
