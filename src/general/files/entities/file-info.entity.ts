import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { FileModes } from '../enums/file-modes.enum';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';
import { Transform } from 'class-transformer';

@Entity('grl_file')
@ObjectType()
export class FileInfo extends CrudEntity {
  
  @Column()
  @Field(() => String) 
  fileName: string;

  @Column()
  @Field(() => String)
  fileExtension: string;

  @Column()
  @Field(() => FileModes)
  fileMode: FileModes;

  @Column('bytea', { nullable: true, select:false  })
  fileBuffer?: Buffer;

  @Column({ nullable: true })
  @Field(() => String, {nullable: true})
  fileMongoId?: string;

  
  @Column({ nullable: true })
  @Field(() => String, {nullable: true})
  @Transform(({ value }) => (value ? `http://localhost:3022/${value}` : null))
  fileUrl?: string;

  @Field(() => String, { nullable: true })
  get transformedFileUrl(): string | null {
    return this.fileUrl ? `http://localhost:3022/${this.fileUrl}` : null;
  }
  
}
