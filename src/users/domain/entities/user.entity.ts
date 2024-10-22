import { Entity } from '@/shared/domain/entities/entity';

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
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
  }

  update(value: string): void {
    this.name = value;
  }

  updatePassword(value: string): void {
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
}
