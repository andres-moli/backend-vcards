import { Module } from '@nestjs/common';
import { WebModule } from './web/web.module';
import { VCardModuleGlobal } from './vcard/vcard-global.module';

@Module({
  imports: [WebModule,VCardModuleGlobal]
})
export class MainModule {}
