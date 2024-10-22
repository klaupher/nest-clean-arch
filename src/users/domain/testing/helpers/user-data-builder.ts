import { faker } from '@faker-js/faker';
import { UserProps } from '../../entities/user.entity';

export function UserDataBuilder(props: Partial<UserProps>): UserProps {
  return {
    name: props.name ?? faker.person.fullName(),
    password: props.password ?? faker.internet.password(),
    email: props.email ?? faker.internet.email(),
    createdAt: props.createdAt ?? new Date(),
  };
}
