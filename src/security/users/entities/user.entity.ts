import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { UserTypes } from '../enums/user-type.enum';
import { UserDocumentTypes } from '../../../common/enum/document-type.enum';
import { UserStatusTypes } from '../enums/status-type.enum';
import { City } from '../../../general/city/entities/city.entity';
import { Department } from '../../../general/department/entities/departament.entity';
import { Country } from '../../../general/country/entities/country.entity';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';
import { FileInfo } from 'src/general/files/entities/file-info.entity';

@Entity({ name: 'sec_user' })
@ObjectType()
export class User extends CrudEntity {

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name:string;


  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  lastName:string;

  @Column({unique:true})
  @Field(() => String)
  email:string;

  @Column()
  password:string
  
  @Column({ nullable: true })
  @Field(() => UserDocumentTypes, { nullable: true })
  identificationType: UserDocumentTypes;

  @Column({ nullable: true})
  @Field(() => String, { nullable: true })
  identificationNumber: string;

  @Column({nullable: true, type:'date'})
  @Field(()=> Date, {nullable:true})
  dateOfBirth?: Date

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  confirmationCode: string;


  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  tokenExpoNotification?: string

  @Column({ default: UserStatusTypes.Active })
  @Field(() => UserStatusTypes,)
  status: UserStatusTypes;

  @Column({ default: false })
  @Field(() => Boolean)
  phoneVerification: boolean

  @Column({ default: false })
  @Field(() => Boolean)
  emailVerification: boolean

  @Column()
  @Field(() => UserTypes)
  type:UserTypes;

  @ManyToOne( () => FileInfo, (file) => file.id ,{ lazy: true, nullable: true })  
  @Field(() => FileInfo, {nullable: true})
  file?: FileInfo;
}
