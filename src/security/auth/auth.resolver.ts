import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { SignUpInput as SignupInput, SignInInput as SigninInput, SignupEmailInput } from './dto';
import { AuthResponse } from './types/auth-response.type';
import { SecurityAuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { SigninAdminInput } from './dto/singin-admin.input';
import { UserAdmin } from '../decorators/user-admin.decorator';
import { ValidateTokenInput } from './dto/validate-token.input';
import { ApprovalTokenInput } from './dto/approval-token.input';
import { SendDoubleVerificationInput } from './dto/send-double-verification.input';

@Resolver(() => AuthResponse )
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}


  @Mutation( () => AuthResponse ,{ name:'signin'})
  async signIn(
    @Args('signinInput') signinInput: SigninInput
  ) : Promise<AuthResponse>
  {
      return this.authService.signin({ user:undefined },signinInput);
  }  

  @Query( () => AuthResponse ,{name:'revalidate'})
  @UseGuards(SecurityAuthGuard)
  revalidate(
    @CurrentUser() user:User
  ) : AuthResponse
  {
    return this.authService.revalidateToken(user);
  }

  @Query( () => String)
  sendEmailRecovryPassword(
    @Args('email') email: string,
  ) : Promise<String> {
    return this.authService.sendEmailRecovryPassword(email);
  }
  @Mutation( () => User )
  @UseGuards(SecurityAuthGuard)
  resetPassword(
    @CurrentUser() user:User,
    @Args('password') password: string,
  ){
    return this.authService.restPassword(user,password)

  }



  @Query( () => User ,{name:'validateUserToken'})
  validateUserToken(
    @Args('validateTokenInput') validateTokenInput: ValidateTokenInput,
  ) : Promise<User> {
    return this.authService.validateUserToken(validateTokenInput);
  }
 
}
