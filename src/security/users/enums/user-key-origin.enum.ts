import { registerEnumType } from "@nestjs/graphql";

export enum UserKeyOrigin {
    TwoSteps = 'twoSteps',
    RecoverPassword = "recoverPassword",
}

registerEnumType(UserKeyOrigin,{name:'UserKeyOrigin'})