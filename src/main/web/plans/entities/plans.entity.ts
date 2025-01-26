import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { FileInfo } from 'src/general/files/entities/file-info.entity';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'web_plans'})
@ObjectType()
export class WebPlans extends CrudEntity{

  @Column({ length: 255 })
  @Field()
  title: string;

  @Column({length: 5000})
  @Field()
  description: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @Column({type: 'timestamptz'})
  @Field(() => Date)
  expirationDate: Date;  // Fecha de vencimiento de la oferta

  @ManyToOne( () => FileInfo,undefined,{ lazy: true })  
  @Field(() => FileInfo,{ nullable:true }) 
  imgen?: FileInfo;

}
