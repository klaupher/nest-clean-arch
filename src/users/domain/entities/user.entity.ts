import { Entity } from '@/shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validade(props);
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
  }

  update(value: string): void {
    UserEntity.validade({ ...this.props, name: value });
    this.name = value;
  }

  updatePassword(value: string): void {
    UserEntity.validade({ ...this.props, password: value });
    this.password = value;
  }

  get name() {
    return this.props.name;
  }

  private set name(v: string) {
    this.props.name = v;
  }

  get email() {
    return this.props.email;
  }

  private set password(v: string) {
    this.props.password = v;
  }

  get password() {
    return this.props.password;
  }
  get createAt() {
    return this.props.createdAt;
  }

  static validade(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
    return isValid;
  }
}
