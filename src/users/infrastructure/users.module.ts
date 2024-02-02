import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases/signup.usercase';
import { UserInMemoryRepository } from './database/in-memory/user-in-memory.repository';
import { BcryptHashProvider } from './providers/hash-provider/bcrypt-hash.provider';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { SigninUseCase } from '../application/usecases/signin.usercase';
import { GetUserUseCase } from '../application/usecases/getuser.usecase';
import { ListUserUseCase } from '../application/usecases/listusers.usercase';
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usercase';
import { UpdateUserUseCase } from '../application/usecases/update-user.usercase';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptHashProvider,
    },
    {
      provide: SignupUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: SigninUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SigninUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: ListUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new ListUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdatePasswordUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UpdatePasswordUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new DeleteUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
