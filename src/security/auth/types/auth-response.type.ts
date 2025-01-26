import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { PersonTypes } from "src/common/enum/person-type.enum";
@ObjectType()
export class AuthResponse{

    @Field(() => String)
    token: string;

    
    @Field(() => User)
    user: User;
    
}