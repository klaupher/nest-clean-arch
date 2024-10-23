import { RepositoryInterface } from './repository-contracts';
import { Entity } from '@/shared/domain/entities/entity';

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number | null;
  perPage?: number | null;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page = 1;
  protected _perPage = 15;
  protected _sort: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: string | null;

  constructor(props: SearchProps = {}) {
    this._page = props.page;
    this._perPage = props.page;
    this._sort = props.sort;
    this._sortDir = props.sortDir;
    this._filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(v: number) {
    let _page = +v;
    if (isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }
    this._page = _page;
  }

  get perPage(): number {
    return this._perPage;
  }

  private set perPage(v: number) {
    let _perPage = v === (true as any) ? this._perPage : +v;
    if (Number.isNaN(_perPage) || _perPage <= 0 || parseInt(_perPage as any) !== _perPage) {
      _perPage = this._perPage;
    }
    this._perPage = _perPage;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(v: string | null) {
    this._sort = v === null || v === undefined || v === '' ? null : v;
  }

  get sortDir(): SortDirection | null {
    return this._sortDir;
  }

  private set sortDir(v: SortDirection | null) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }
    const dir = `${v}`.toLowerCase();
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir;
  }

  get filter(): string | null {
    return this._filter;
  }

  private set filter(v: string | null) {
    this._filter = v === null || v === undefined || v === '' ? null : v;
  }
}

export interface SearchableRepositoryInterface<E extends Entity, SearchInput, SearchOutput>
  extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}
