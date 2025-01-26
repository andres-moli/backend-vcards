import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { DummyModule } from './dummy/dummy.module';
import { CityModule } from './city/city.module';
import { DepartmentModule } from './department/department.module';
import { CountryModule } from './country/country.module';
import { ParameterModule } from './parameters/parameter.module';
import { MailModule } from './email/emial.module';

@Module({
  imports: [FilesModule, DummyModule, 
    CityModule, DepartmentModule, CountryModule, ParameterModule, MailModule]
})
export class GeneralModule {}