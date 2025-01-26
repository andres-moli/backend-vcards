import { EntityManager } from "typeorm";
import { IUser } from "./user.interface";

export interface IContext {
    transactionManager?:EntityManager;
    user:IUser;
    disableAudits?:boolean;
}