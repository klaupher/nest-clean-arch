import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set a props and id', () => {
    const props: StubProps = { prop1: 'value', prop2: 15 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('Should accept a valid uuid', () => {
    const props: StubProps = { prop1: 'value', prop2: 15 };
    const id = 'b7326fc5-b9f1-4f66-9980-3bf9a3727f1f';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity.id)).toBeTruthy();
    expect(entity.id).toBe(id);
  });

  it('Should convert a entity to a Javascript Object', () => {
    const props: StubProps = { prop1: 'value', prop2: 15 };
    const id = 'b7326fc5-b9f1-4f66-9980-3bf9a3727f1f';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
