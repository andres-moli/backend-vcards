import { Injectable } from '@nestjs/common';
import { IAuditService } from '../../patterns/crud-pattern/interfaces/audit-service.interface';
import { IContext } from '../../patterns/crud-pattern/interfaces/context.interface';

@Injectable()
export class AuditService implements IAuditService {


    async Audit(
        context: IContext, 
        serviceName: string, 
        action: string, 
        objectId?:string,
        valueBefore?: object, 
        valueAfter?: object
    ): Promise<void> {

        console.log('*** AUDIT START ***');
        console.log(`service name: ${serviceName}, action:${action}`);

        if(valueBefore)
        {
            console.log('*** Before ***');
            console.log(valueBefore);
        }

        if(valueAfter)
        {
            console.log('*** After ***');
            console.log(valueAfter);
        }
        
        console.log('*** AUDIT END ***');
    }

}
