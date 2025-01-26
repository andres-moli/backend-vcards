import { Module } from '@nestjs/common';
import { CarruselModule } from './carrusel/carrusel.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [CarruselModule,PlansModule]
})
export class WebModule {}
