import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; 
import { UsersService } from '../users/services/users.service';
import { User } from '../users/entities/user.entity';
import { UserTypes } from '../users/enums/user-type.enum';
import { SignInInput as SigninInput, SignupEmailInput, SignUpInput as SignupInput } from './dto';
import { AuthResponse } from './types/auth-response.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { cityEvent, countryEvent, departmentEvent, sendVerificationCodeToJwtEvent, signupEmailEvent, verifyIdentificationNumberEvent } from './constants/events.constants';
import { UserDocumentTypes } from '../../common/enum/document-type.enum';
import { UserStatusTypes } from '../users/enums/status-type.enum';
import { ValidateTokenInput } from './dto/validate-token.input';
import { VerificationTypes } from './enum/verification-type';
import { ApprovalTokenInput } from './dto/approval-token.input';
import { checkCodeEvent, registerCodeEvent } from '../users/constants/events.constants';
import { SendDoubleVerificationInput } from './dto/send-double-verification.input';
import { SigninAdminInput } from './dto/singin-admin.input';
import { UserKeyOrigin } from '../users/enums/user-key-origin.enum';
import { IContext } from '../../patterns/crud-pattern/interfaces/context.interface';
import { calculateDigitVerification, generateRandomCode } from '../../common/functions';
import { MailService } from 'src/general/email/service/email.service';
import moment from 'moment';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
        private readonly mailService: MailService
    ){}

    async sendEmailRecovryPassword(email: string){
        try {
            const user = await this.userService.findOneByEmail({user: undefined},email,true);
            const token = this.getJwtTokenWithAuth(user);
            let contextE = {
                url: process.env.EMAIL_FRONTEND + "resetPassword/" + token,
                name: user.name + " " + user.lastName || "",
                date: moment().format("YYYY MM DD HH:mm")
            }
            await this.mailService.sendMail(email,"RECUPERAR CONTRASEÑA", "password",contextE)
            return "Correo enviado con exito"
        }catch(err) {
            new Error(err.message)
        }

    }
    async restPassword(user: User,password: string){
        return this.userService.resetPassword({user},password)
    }

    private getJwtTokenWithOutAuth( user:User ) : string {
        return this.jwtService.sign({ id: user.id, hasAuthorized: false });
    }

    private getJwtTokenWithAuth( user:User ) : string {
        return this.jwtService.sign({ id: user.id, hasAuthorized: true });
    }

    private async checkToken(token: string): Promise<User> {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
            ignoreExpiration: false
        });
    
        const { id } = payload;

        const user = await this.userService.findOneById({user:undefined}, id, true)

        return user
      } catch (e) {
        throw new BadRequestException("Invalid token");
      }
    }

    async signin(context:IContext, signinInput: SigninInput) : Promise<AuthResponse> {
        const { email, password  } = signinInput

        const user = await this.userService.findOneByEmail(context, email, true);

        if(user.status === UserStatusTypes.Inactive || !bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credenciales invalidas');
        const token = this.getJwtTokenWithAuth(user);

        // const token = this.getJwtTokenWithAuth(user);

        return { token, user };
    }

    async validateUser(context:IContext, id: string) : Promise<User>{
        const user = await this.userService.findOne(context,id,true);

        if(user.status === UserStatusTypes.Inactive )
            throw new UnauthorizedException(`user is inactive`);

        delete user.password;

        return user;
    }


    async validateUserToken(validateTokenInput: ValidateTokenInput): Promise<User> {
        const { token } = validateTokenInput;

        const user = await this.checkToken(token);
        delete user.password;

        return user;
    }


    revalidateToken( user: User ) : AuthResponse
    {
        const token = this.getJwtTokenWithAuth(user);
        return { token, user };
    }

}
