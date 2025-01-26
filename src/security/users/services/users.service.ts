import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { CreateUserInput } from '../dto/inputs/create-user.input';
import { UpdateUserInput } from '../dto/inputs/update-user.input';
import { User } from '../entities/user.entity';
import { UserTypes } from '../enums/user-type.enum';
import { FindUserArgs } from '../dto/args/find-users.args';
import { UserStatusTypes } from '../enums/status-type.enum';
import { CodeConfirmationInput } from '../dto/inputs/code-confirmation.input';
import { UserDocumentTypes } from '../../../common/enum/document-type.enum';
import { RecoverPasswordInput } from '../dto/inputs/recover-password.input';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordInput } from '../dto/inputs/update-password.input';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateUserInformationInput } from '../dto/inputs/update-user-information.input';
import { UpdateUserPasswordInput } from '../dto/inputs/update-user-password.input';
import { DoubleVerificationInput } from '../dto/inputs/double-verification.input';
import { checkCodeEvent, registerCodeEvent } from '../constants/events.constants';
import { generateRandomCode } from '../../../common/functions';
import { UserKeyOrigin } from '../enums/user-key-origin.enum';
import { CodeRecoverPasswordInput } from '../dto/inputs/code-recover-password.input';
import { CrudServiceStructure } from '../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from '../../../patterns/crud-pattern/mixins/crud-service.mixin';
import { config } from '../../../config';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { SignupEmailInput } from '../../auth/dto';
import { recoverPasswordEmailEvent } from '../../auth/constants/events.constants';
import { FilesService } from 'src/general/files/services/files.service';

export const serviceStructure = CrudServiceStructure({
  entityType: User,
  createInputType: CreateUserInput,
  updateInputType: UpdateUserInput,
  findArgsType:FindUserArgs
})

@Injectable()
export class UsersService extends CrudServiceFrom(serviceStructure) {
    
  constructor(
    @Inject(config.KEY) 
    private readonly configService: ConfigType<typeof config>,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly fileService: FilesService
  ){ super(); }  

  private hash(
    plainPassword:string
  ):string{
    return bcrypt.hashSync(plainPassword,10);
  }

  private checkUserPassword(password: string, user: User){
    const { password: currentPassword } = user;

    if(!bcrypt.compareSync(password, currentPassword)) throw new BadRequestException('There was a problem validating the current password.');

    return true;
  }
  
  private checkPasswordConfirm(password: string, passwordConfirm: string){
    if (password !== passwordConfirm) throw new BadRequestException('confirmationPassword must be equal to password');

    return true;
  }

  async resetSuperAdmin(context:IContext): Promise<User>
  {
    const repository = this.getRepository(context);

    const saEmail = this.configService.sa.email;
    const saPassword = this.configService.sa.password;

    let user = await this.findOneByEmail(context,saEmail);

    const password = this.hash(saPassword);

    if(!user)
    {
      user = repository.create({ email:saEmail, password, name:'super admin',  type:UserTypes.SuperAdmin, status: UserStatusTypes.Active });
    }
    else
    {
      user.password = password;
    }
      
    return repository.save(user);
  }

  async partialCreation(context: IContext, createInput: SignupEmailInput): Promise<User> {
    const repository = this.getRepository(context);

    const { email, password } = createInput

    const findUser = await repository.findOne({
      where: {
        email
      }
    });

    if(findUser){
      throw new BadRequestException(`User with email: ${email} already exists in the database`);
    }

    const newUser = repository.create({...createInput, password: this.hash(password) });

    await repository.save(newUser);

    return newUser;
  }

  async beforeCreate(context:IContext,repository: Repository<User>, entity: User, createInput: CreateUserInput): Promise<void> {
    
    if(
      createInput.type === UserTypes.SuperAdmin && 
      (context.user as User).type !== UserTypes.SuperAdmin
    ) throw new ForbiddenException(`only a superAdmin can create a new superAdmin user`);

    
    const sameEmailUser = await this.findOneByEmail(context,createInput.email);
    const sameNumberUser = await this.findOneByIdentificationNumber(context,createInput.identificationNumber,createInput.identificationType);

    if(sameEmailUser) throw new BadRequestException(`User with email ${createInput.email} alredy exists`);
    if(sameNumberUser) throw new BadRequestException(`User with number document ${createInput.identificationNumber} alredy exists`);
    if(createInput.fileId){
      entity.file = await this.fileService.findOne(context,createInput.fileId,true);
    }
    entity.password = this.hash(createInput.password);
  }
  async afterCreate(context: IContext, repository: Repository<User>, entity: User, createInput: CreateUserInput): Promise<void> {

  }

  async beforeUpdate(context:IContext,repository: Repository<User>, entity: User, updateInput: UpdateUserInput): Promise<void> {
    if(
      updateInput.type === UserTypes.SuperAdmin && 
      (context.user as User).type !== UserTypes.SuperAdmin
    ) throw new ForbiddenException(`only a superAdmin can update a new superAdmin user`);
    if(updateInput.fileId){
      entity.file = await this.fileService.findOne(context,updateInput.fileId,true);
    }
    if(updateInput.email && updateInput.password  )
      entity.password = this.hash(updateInput.password);
  }

  async beforeRemove(context: IContext, repository: Repository<User>, entity: User): Promise<void> {
    if(
      entity.type === UserTypes.SuperAdmin && 
      (context.user as User).type !== UserTypes.SuperAdmin
    ) throw new ForbiddenException(`only a superAdmin can remove a new superAdmin user`);
  }

  async findOneByEmail(context:IContext,email: string, orFail?:boolean) : Promise<User> {

    const repository = this.getRepository(context);
 
    const user = await repository.findOneBy({ email });

    if (orFail && !user) throw new NotFoundException(`User with email: ${email} not found`);

    return user;
  } 

  async findOneById(context:IContext,id: string, orFail?:boolean) : Promise<User> {
    const repository = this.getRepository(context);

    const user = await repository.findOne({
      where: {
        id
      }
    })

    if (orFail && !user) throw new NotFoundException(`User with id: ${id} not found`);

    return user;
  }

  async findOneByIdentificationNumber(context: IContext, identificationNumber: string, identificationType: UserDocumentTypes , orFail?: boolean): Promise<User>{
    const repository = this.getRepository(context);
 
    const user = await repository.findOneBy({ identificationNumber, identificationType });

    if (orFail && !user) throw new NotFoundException(`User with identification number: ${identificationNumber} not found`);

    return user;
  }

  async findOneByIdentificationNumberOrEmail(context: IContext, identificationNumber: string, email: string , orFail?: boolean): Promise<User>{
    const repository = this.getRepository(context);
 
    const user = await repository.findOne({ 
      where: [
        { identificationNumber },
        { email }
      ]
     });

    if (orFail && !user) throw new NotFoundException(`User with identification number: ${identificationNumber} not found`);

    return user;
  }

  async codeConfirmation(context: IContext, codeConfirmationInput: CodeConfirmationInput): Promise<User> {

    const {code, email} = codeConfirmationInput;

    const repository = this.getRepository(context);

    const user = await this.findOneByEmail(context, email, true);

    if(user.confirmationCode !== code){
      throw new BadRequestException("The code supplied does not correspond to the one sent");
    }

    const status = user.identificationNumber ? UserStatusTypes.Active : UserStatusTypes.PartlyActive

    await repository.update(user.id, { status } )

    user.status = status;

    return user;
  }

  async recoverPassword(context: IContext, passwordRecoveryInput: RecoverPasswordInput): Promise<string>{
    const { email } = passwordRecoveryInput;

    const user = await this.findOneByEmail(context, email, true);

    const code = generateRandomCode(6);
  
    await this.eventEmitter.emitAsync(recoverPasswordEmailEvent, {context, user, code});

    await this.eventEmitter.emitAsync(registerCodeEvent, {context, code, user, origin: UserKeyOrigin.RecoverPassword });

    return "Code sent successfully";
  }

  async updatePassword(context: IContext, updatePasswordInput: UpdatePasswordInput): Promise<User>{
    const { token, password, passwordConfirm } = updatePasswordInput;

    const repository = this.getRepository(context);

    this.checkPasswordConfirm(password, passwordConfirm);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt.secret
      });
  
      const { id } = payload;
  
      const user = await this.findOneById(context, id, true);

      const hashedPassword = this.hash(password);

      await repository.update(user.id, { password: hashedPassword } )

      return user;
    } catch (error) {
      throw new ForbiddenException("Invalid token");
    }
  }




  async updateUserPassword(context: IContext, updateUserPasswordInput: UpdateUserPasswordInput): Promise<User>{  
    const { currentPassword, newPassword, newPasswordConfirm } = updateUserPasswordInput

    this.checkPasswordConfirm(newPassword, newPasswordConfirm);

    const { user: { id } } = context
    
    const currentUser = await this.findOneById(context, id, true);

    this.checkUserPassword(currentPassword, currentUser);

    const repository = this.getRepository(context);
    
    await repository.update(id, {password: this.hash(newPassword)})

    return currentUser;
  }

  async resetPassword(context: IContext, password: string){
    const { user: { id } } = context
    
    const currentUser = await this.findOneById(context, id, true);
    const repository = this.getRepository(context);
    
    await repository.update(id, {password: this.hash(password)})

    return currentUser;
  }

  async enableAndDisableDoubleVerification(context: IContext, doubleVerificationInput: DoubleVerificationInput): Promise<string>{
    const { code, emailVerification, phoneVerification} = doubleVerificationInput;

    const { user } = context;

    const repository = this.getRepository(context);

    const currentUser = await this.findOneById(context, user.id, true);
    
    const { phoneVerification: phoneVerificationDb, emailVerification: emailVerificationDb } = currentUser;

    if ((phoneVerification && !phoneVerificationDb) || (emailVerification && !emailVerificationDb)) {
      if(!code) throw new BadRequestException("You must provide a code");

      const checkJwtCode= await this.eventEmitter.emitAsync(checkCodeEvent, { context, code, user, origin: UserKeyOrigin.TwoSteps});      
  
      const checkJwtCodeEv = checkJwtCode[0]
  
      if(!checkJwtCodeEv) throw new UnauthorizedException('Invalid code');
      
      delete doubleVerificationInput.code;

      await repository.update(user.id, {...doubleVerificationInput})
    }

    if((!phoneVerification && !emailVerification) || (!phoneVerification && phoneVerificationDb) || (!emailVerification && emailVerificationDb)) {
      delete doubleVerificationInput.code;

      await repository.update(user.id, {...doubleVerificationInput})
    }

    return "Updated two-step verification";
  }

  async fullName(context:IContext, user: User): Promise<string>{  
    const { name, lastName } = user;
  
    return `${name} ${lastName}`;
  }

  async codeRecoverPassword(context: IContext, codeRecoverPasswordInput: CodeRecoverPasswordInput): Promise<string> {
    const { code, email } = codeRecoverPasswordInput;

    const user = await this.findOneByEmail(context, email, true);

    const [result] = await this.eventEmitter.emitAsync(checkCodeEvent, { context, code, user, origin: UserKeyOrigin.RecoverPassword});
    
    if(!result) throw new UnauthorizedException('Invalid code');

    const token = this.jwtService.sign({ id: user.id });

    return token;
  }
}
