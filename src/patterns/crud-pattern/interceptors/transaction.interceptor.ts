import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Observable, catchError, tap, throwError } from "rxjs";
import { EntityManager } from "typeorm";
import { ContextUtils } from "../utils/context.utils";

@Injectable()
export class TransactionInterceptor implements NestInterceptor {

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) { }

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<any>> {

        const req = ContextUtils.getRequest(context);
        
        const queryRunner = this.entityManager.connection.createQueryRunner();

        await queryRunner.startTransaction();

        req.transactionManager = queryRunner.manager;

        return next.handle().pipe(
            tap(async () => {
                await queryRunner.commitTransaction();
                await queryRunner.release();
            }),
            catchError(async err => {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                throw err;
            })
        );
    }
}