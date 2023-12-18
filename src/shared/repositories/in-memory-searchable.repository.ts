import { BaseEntity } from '../domain/entities/base';
import { InMemoryRepository } from './in-memory.repository';
import { SearchableRepositoryInterface } from './searchable-repository-contracts';

export abstract class InMemorySearchableRepository<E extends BaseEntity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
