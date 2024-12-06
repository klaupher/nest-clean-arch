import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { Signup } from '../application/usecases/signup.usecase';
import { BCryptHashProvider } from './providers/hash-provider/bcrypt-hash.provider';
import { Signin } from '../application/usecases/signin.usecase';
import { GetUser } from '../application/usecases/getuser.usecase';
import { ListUsers } from '../application/usecases/listusers.usecase';
import { DeleteUser } from '../application/usecases/delete-user.usecase';
import { UpdatePassword } from '../application/usecases/update-password.usecase';
import { UpdateUser } from '../application/usecases/update-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
    {
      provide: Signup.UseCase,
      useFactory: (userRepository: UserRepository.Repository, hashProvider: HashProvider) => {
        return new Signup.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: Signin.UseCase,
      useFactory: (userRepository: UserRepository.Repository, hashProvider: HashProvider) => {
        return new Signin.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: GetUser.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new GetUser.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: ListUsers.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new ListUsers.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdateUser.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UpdateUser.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdatePassword.UseCase,
      useFactory: (userRepository: UserRepository.Repository, hashProvider: HashProvider) => {
        return new UpdatePassword.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: DeleteUser.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new DeleteUser.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
