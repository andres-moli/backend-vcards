import { userId, userStub } from '../stubs/user.stub';
import { User } from '../../entities/user.entity';
import { IContext } from '../../../../patterns/crud-pattern/interfaces/context.interface';

export const usersResolverMock = {
  findOne: jest.fn().mockImplementation((context: IContext, id: string): Promise<User> => {
    return Promise.resolve({
      id,
      ...userStub
    })
  }),
  create: jest.fn().mockImplementation((context: IContext, createInput): Promise<User> => {
    return Promise.resolve({
      id: userId,
      ...createInput
    })
  }),
  findAll: jest.fn().mockImplementation((context: IContext, args): Promise<[User]> => {
    return Promise.resolve([
      {
        id: userId,
        ...userStub
      }
    ])
  }),
  remove: jest.fn().mockImplementation((context: IContext, id: string): Promise<User> => {
    return Promise.resolve(
      {
        id: userId,
        ...userStub
      }
    )
  }),
  update: jest.fn().mockImplementation((context: IContext, id: string, updateInput): Promise<User> => {
    return Promise.resolve(
      {
        id,
        ...userStub,
        ...updateInput
      }
    )
  })
}
