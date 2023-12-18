import { BaseEntity } from '@/shared/domain/entities/base';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends BaseEntity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'Teste Name', price: 50 });
    await sut.insert(entity);
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'Teste Name', price: 50 });
    await sut.insert(entity);
    const result = await sut.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it('Should returns all entities', async () => {
    const entity = new StubEntity({ name: 'Teste Name', price: 50 });
    await sut.insert(entity);
    const result = await sut.findAll();
    expect([entity]).toStrictEqual(result);
  });

  it('Should throw error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'Teste Name', price: 50 });
    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should updated a entity', async () => {
    const entity = new StubEntity({ name: 'Teste Name', price: 50 });
    await sut.insert(entity);
    const entityUpdated = new StubEntity(
      { name: 'Update name', price: 25 },
      entity.id,
    );
    await sut.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw error on delete when entity not found', async () => {
    await expect(sut.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a entity', async () => {
    const entity = new StubEntity({ name: 'Teste Name', price: 50 });
    await sut.insert(entity);
    await sut.delete(entity.id);
    expect(sut.items).toHaveLength(0);
  });
});
