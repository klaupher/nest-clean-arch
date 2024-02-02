import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usescases/user-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';

export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string;
    passOld: string;
    passNew: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      if (!input.passOld || !input.passNew) {
        throw new InvalidPasswordError(
          'Old password and new password is required',
        );
      }
      const checkPassOld = await this.hashProvider.compareHash(
        input.passOld,
        entity.password,
      );
      if (!checkPassOld) {
        throw new InvalidPasswordError('Old password does not match');
      }
      const hashPassNew = await this.hashProvider.generateHash(input.passNew);
      entity.updatePass(hashPassNew);
      await this.userRepository.update(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
