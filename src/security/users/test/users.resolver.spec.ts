import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { UsersResolver } from '../resolvers/users.resolver';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundException } from '@nestjs/common';
import { userId, userStub } from './stubs/user.stub';
import { usersResolverMock } from './__mocks__/users.resolver';
import { CreateUserInput } from '../dto/inputs/create-user.input';
import { UserTypes } from '../enums/user-type.enum';
import { UpdateUserInput } from '../dto/inputs/update-user.input';
import { AuthService } from '../../auth/auth.service';
import { UserDocumentTypes } from '../../../common/enum/document-type.enum';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersResolver],
      providers: [
        UsersService,
        AuthService,
        JwtService,
        EventEmitter2,
        {
          provide: UsersService,
          useValue: usersResolverMock
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findOne()', () => {
    it('should find a user', async () => {
      const user = await resolver.findOne(
        userId,
        { user: undefined },
      )

      expect(user).toEqual({
        id: userId,
        ...userStub
      })

      expect(service.findOne).toHaveBeenCalled();
    });

    it('should return error because it does not find user', async () => {
      usersResolverMock.findOne.mockReturnValueOnce(new NotFoundException)

      const user = await resolver.findOne(
        userId,
        { user: undefined },
      )

      expect(user).toBeInstanceOf(NotFoundException)
    })
  });

  describe('create()', () => {
    it('should create a user', async () => {
      const data: CreateUserInput = {
        name: "Nicolas",
        lastName: "Gonzalez",
        email: 'ngonzalez@comercializadora-s3.com',
        password: "123456789aA",
        identificationType: UserDocumentTypes.CitizenshipCard,
        identificationNumber: "1094961974",
        phoneCountryCode: "57",
        phoneNumber: "3167951928",
        country: "Colombia",
        province: "Quindio",
        city: "Armenia",
        address: "Calle 9",
        hasRural: false,
        type: UserTypes.User
      }

      const newUser = await resolver.create(
        data, 
        { user: undefined },
      );

      expect(newUser).toEqual({
        id: userId,
        ...data,
      });
    })
  })

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: userId,
          ...userStub
        }
      ];

      const allUsers = await resolver.findAll(
        { user: undefined },
        undefined
      )
  
      expect(allUsers).toEqual(users);
    });
  })

  describe('remove()', () => {
    it('should remove the user', async () => {
      const user = await resolver.remove(
        userId,
        { user: undefined },
      )

      expect(user).toEqual({id: userId, ...userStub})
    });
  })

  describe('update()', () => {
    it('should update the user', async () => {
      const data: UpdateUserInput = {
        id: userId,
        isActive: true
      }

      const user = await resolver.update(
        data,
        { user: undefined },
      )

      expect(user).toEqual({...data,  ...userStub})
    });
  })
});