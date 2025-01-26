import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { ContextUtils } from "../utils/context.utils";
import { IContext } from "../interfaces/context.interface";

export const CurrentContext = createParamDecorator(
    ( data: unknown,context: ExecutionContext ) =>{

        const request = ContextUtils.getRequest(context);

        const user = request.user;
        const transactionManager = request.transactionManager;

        const currentContext:IContext = { user, transactionManager };

        return currentContext;
    })