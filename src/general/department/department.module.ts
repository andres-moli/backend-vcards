import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "./entities/departament.entity";
import { DepartmentResolver } from "./resolvers/department.resolver";
import { DepartmentService } from "./services/department.service";

@Module({
    imports: [TypeOrmModule.forFeature([Department])],
    providers: [DepartmentResolver, DepartmentService],
    exports: [DepartmentService]
})

export class DepartmentModule {}
  