import { IContext } from '../../../../patterns/crud-pattern/interfaces/context.interface';
import { User } from '../../entities/user.entity';
import { userId, userStub } from '../stubs/user.stub';

export const usersServicesMock = {
  findOneBy: jest.fn().mockImplementation((id: string): Promise<User> => {
    return Promise.resolve({
      id,
      ...userStub
    })
  }),
  findOneByEmail: jest.fn().mockImplementation((context: IContext, email: string, orFail: boolean): Promise<User> => {
    return Promise.resolve({
      id: userId,
      ...userStub,
    })
  }),
  update: jest.fn().mockImplementation((id: string, updateInput): Promise<User> => {
    return Promise.resolve(
      {
        id: userId,
        ...userStub
      }
    )
  })
}
