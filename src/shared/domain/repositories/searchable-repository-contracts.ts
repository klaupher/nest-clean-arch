import { RepositoryInterface } from './repository-contracts';
import { Entity } from '@/shared/domain/entities/entity';

export interface SearchableRepositoryInterface<E extends Entity, SearchInput, SearchOutput>
  extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
