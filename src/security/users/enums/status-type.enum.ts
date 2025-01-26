import { registerEnumType } from "@nestjs/graphql";

export enum UserStatusTypes {
    Active = 'active',
    PartlyActive = "partlyActive", // This is because the user is missing information to add to their profile.
    Inactive = 'inactive',
}

registerEnumType(UserStatusTypes,{name:'UserStatusTypes'})