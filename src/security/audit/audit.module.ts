import { Global, Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditResolver } from './audit.resolver';
import { IAuditService } from '../../patterns/crud-pattern/interfaces/audit-service.interface';

const AuditProvider = {
  provide: IAuditService, // Used as a symbol
  useClass: AuditService
};

@Global()
@Module({
  providers: [AuditResolver, AuditService, AuditProvider],
  exports:[AuditProvider]
})
export class AuditModule {}
