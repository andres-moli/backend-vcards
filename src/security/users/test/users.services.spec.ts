import { Test, TestingModule } from '@nestjs/testing';
import { usersServicesMock } from './__mocks__/users.services';
import { UsersService } from '../services/users.service';
import { userId, userStub } from './stubs/user.stub';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CodeConfirmationInput } from '../dto/inputs/code-confirmation.input';
import { UserStatusTypes } from '../enums/status-type.enum';
import { User } from '../entities/user.entity';
import { config } from '../../../config';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      providers: [
        UsersService,
        JwtService,
        EventEmitter2,
        { provide: 'UserRepository', useValue: usersServicesMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    it('should find a user', async () => {
      const user = await service.findOne({ user: undefined }, userId, true);

      expect(user).toEqual({ id: { id: userId }, ...userStub });
    });

    it('should fail because it does not find the user', async () => {
        usersServicesMock.findOneBy.mockRejectedValueOnce(new NotFoundException);

        const user = service.findOne({ user: undefined }, userId, true);

        await expect(user).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('codeConfirmation()', () => {
    it('should return user', async () => {
        const data: CodeConfirmationInput = {
            code: "12345",
            email: 'ngonzalez@comercializadora-s3.com'
        }

        usersServicesMock.findOneBy.mockImplementation((email: string): Promise<User> => {
            return Promise.resolve({
              id: userId,
              ...userStub
            })
        });

        const codeConfirmation = await service.codeConfirmation({ user: undefined }, data);

        expect(codeConfirmation).toEqual({
            id: userId,
            ...userStub,
            status: UserStatusTypes.Active
        })
    })

    it('should throw error for different code', async () => {
        const data: CodeConfirmationInput = {
            code: "54321",
            email: 'ngonzalez@comercializadora-s3.com'
        }

        usersServicesMock.findOneBy.mockImplementation((email: string): Promise<User> => {
            return Promise.resolve({
              id: userId,
              ...userStub
            })
        });

        const codeConfirmation = service.codeConfirmation({ user: undefined }, data);

        await expect(codeConfirmation).rejects.toBeInstanceOf(BadRequestException);
    })

    it('should throw error for different user', async () => {
        const data: CodeConfirmationInput = {
            code: "54321",
            email: 'ngonzalez@comercializadora-s3.com'
        }

        usersServicesMock.findOneBy.mockRejectedValueOnce(new NotFoundException);

        const codeConfirmation = service.codeConfirmation({ user: undefined }, data);

        await expect(codeConfirmation).rejects.toBeInstanceOf(NotFoundException);
    })
  })
});
