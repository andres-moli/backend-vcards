import { Module } from '@nestjs/common';
import { CarruselService } from './services/carrusel.service';
import { CarruselResolver } from './resolvers/carrusel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebCarrusel } from './entities/carrusel.entity';
import { FilesModule } from 'src/general/files/files.module';

@Module({
  providers: [CarruselService,CarruselResolver],
  imports:[
    TypeOrmModule.forFeature([WebCarrusel]), FilesModule
  ]
})
export class CarruselModule {}
