import { BaseEntity } from '@/shared/domain/entities/base';
import { SearchResult } from '@/shared/repositories/searchable-repository-contracts';

export type PaginationOutput<Item = any> = {
  items: Item[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    result: SearchResult<BaseEntity>,
  ): PaginationOutput<Item> {
    return {
      items,
      total: result.total,
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    };
  }
}
