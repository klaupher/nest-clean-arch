import { Entity } from '../../entities/entity';
import { NotFoundError } from '../../errors/errors';
import { InMemoryRepository } from '../../repositories/in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it('Should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'value', price: 50 });
    await sut.insert(entity);
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should find a entity by Id', async () => {
    const entity = new StubEntity({ name: 'value', price: 50 });
    await sut.insert(entity);
    const output = await sut.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(output.toJSON());
  });

  it('Should return all entities', async () => {
    const entity = new StubEntity({ name: 'value', price: 50 });
    await sut.insert(entity);
    const output = await sut.findAll();
    expect([entity]).toStrictEqual(output);
  });

  it('Should throw error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'value', price: 50 });
    await expect(sut.update(entity)).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should update a entity', async () => {
    const entity = new StubEntity({ name: 'value', price: 50 });
    await sut.insert(entity);
    const entityUpdate = new StubEntity({ name: 'value', price: 50 }, entity.id);
    await sut.update(entityUpdate);
    expect(entityUpdate.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw error on delete when entity not found', async () => {
    await expect(sut.delete('fakeId')).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should delete a entity', async () => {
    const entity = new StubEntity({ name: 'value', price: 50 });
    await sut.insert(entity);
    await sut.delete(entity.id);
    expect(sut.items).toHaveLength(0);
  });
});
