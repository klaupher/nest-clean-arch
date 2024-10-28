import { BadRequestError } from '@/shared/application/errors/erros-application';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { ConflictError } from '@/shared/domain/errors/errors';
import { Signup } from '@/users/application/usecases/signup.usecase';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UserInMemoryRepository } from '@/users/infrastruture/database/in-memory/repositories/user-in-memory.repository';
import { BCryptHashProvider } from '@/users/infrastruture/providers/hash-provider/bcrypt-hash.provider';

describe('Signup UserCase unit test:', () => {
  let sut: Signup.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BCryptHashProvider();
    sut = new Signup.UseCase(repository, hashProvider);
  });

  it('Should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const props = UserDataBuilder({});
    const result = await sut.execute(props);

    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(spyInsert).toHaveBeenCalledTimes(1);
  });

  it('Should not be able to register with same email twice', async () => {
    const props = UserDataBuilder({ email: 'a@a.com' });
    await sut.execute(props);

    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConflictError);
  });

  it('Should thows error when name not provider', async () => {
    const props = Object.assign(UserDataBuilder({}), { name: null });
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should thows error when email not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { email: null });
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should thows error when password not provider', async () => {
    const props = Object.assign(UserDataBuilder({}), { password: null });
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
  });
});
