import { PrismaClient, User } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserModelMapper } from '@/users/infrastruture/database/prisma/models/user-model.mapper';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';

describe('UserModelMapper integration tests', () => {
  let prismaClient: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
  });

  beforeEach(async () => {
    await prismaClient.user.deleteMany();
    props = {
      id: 'd4255494-f981-4d26-a2a1-35d3f5b8d36a',
      name: 'Test name',
      email: 'a@a.com',
      password: 'TestPassword123',
      role: 'USER',
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it('should throws error when user model is invalid', async () => {
    const model: User = Object.assign(props, { name: null });
    expect(() => UserModelMapper.toEntity(model)).toThrowError(ValidationError);
  });

  it('should convert a user model to a user entity', async () => {
    const model: User = await prismaClient.user.create({
      data: props,
    });
    const sut = UserModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(UserEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
