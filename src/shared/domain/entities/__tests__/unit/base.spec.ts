import { validate as uuidValidate } from 'uuid';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { BaseEntity } from '../../base';

type StubProps = {
  prop1: string;
  prop2: number;
};
class StubBaseEntity extends BaseEntity<StubProps> {}

describe(' BaseEntity unit test', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const entity = new StubBaseEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('Should accept valid uuid', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const id = 'f46b561d-4da9-4052-9249-2ef0d32134ee';
    const entity = new StubBaseEntity(props, id);

    expect(uuidValidate(entity.id)).toBeTruthy();
    expect(entity.id).toBe(id);
  });

  it('Should convert a entity to a JSON', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const id = 'f46b561d-4da9-4052-9249-2ef0d32134ee';
    const entity = new StubBaseEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
