import { ObjectType, Field, Float } from '@nestjs/graphql';
import { FileInfo } from 'src/general/files/entities/file-info.entity';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';


@Entity({ name:'web_carrusel'})
@ObjectType()
export class WebCarrusel extends CrudEntity {

  @Column({ nullable:true })
  @Field(() => String)
  title?:string;

  @Column({ nullable:true })
  @Field(() => String)
  descripcion?:string;

  
  @Column({ nullable:true })
  @Field(() => String)
  link?:string;

  @ManyToOne( () => FileInfo,undefined,{ lazy: true })  
  @Field(() => FileInfo,{ nullable:true }) 
  imgen?: FileInfo;
}
