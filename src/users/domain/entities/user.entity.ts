import { BaseEntity } from '@/shared/domain/entities/base';
import { UserValidatorFactory } from '../validators/validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends BaseEntity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(value: string): void {
    UserEntity.validate({ ...this.props, name: value });
    this.name = value;
  }

  updatePass(value: string): void {
    UserEntity.validate({ ...this.props, password: value });
    this.password = value;
  }

  get name() {
    return this.props.name;
  }
  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
