import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuditModule } from './audit/audit.module';
@Module({
  imports: [UsersModule, AuthModule, AuditModule]
})
export class SecurityModule {}
