import { UserEntity } from '../entities/user.entity';
import { SearchableRepositoryInterface } from '@/shared/repositories/searchable-repository-contracts';
import {
  SearchResult as DefaultSearchResult,
  SearchParams as DefaultSearchParams,
} from './../../../shared/repositories/searchable-repository-contracts';

export namespace UserRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<UserEntity, Filter> {}
  export interface Repository
    extends SearchableRepositoryInterface<
      UserEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntity>;
    emailExists(email: string): Promise<void>;
  }
}
