import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Parameter } from "./entities/parameter.entity";
import { ParameterResolver } from "./resolver/parameter.resolver";
import { ParameterService } from "./service/parameter.service";
import { FilesModule } from "../files/files.module";


@Module({
    imports: [TypeOrmModule.forFeature([Parameter]), FilesModule],
    providers: [ParameterResolver, ParameterService],
    exports: [ParameterService]
})

export class ParameterModule {}
  