import { registerEnumType } from "@nestjs/graphql";

export enum PersonTypes {
    TRABAJADOR = 'TRABAJADOR',
    CLIENTE = 'CLIENTE',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
    CAJA = 'CAJA'
}

registerEnumType(PersonTypes,{name:'PersonTypes'})