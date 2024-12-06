import { ValidationError } from '@/shared/domain/errors/validation-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { User } from '@prisma/client';

export class UserModelMapper {
  static toEntity(model: User) {
    const data = {
      name: model.name,
      password: model.password,
      email: model.email,
      role: model.role,
      createdAt: model.createdAt,
    };

    try {
      return new UserEntity(data, model.id);
    } catch (err) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
