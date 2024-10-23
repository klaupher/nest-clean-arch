import { SearchParams } from '../../repositories/searchable-repository-contracts';

describe('Searchable Repository unit test', () => {
  describe('SearchParam tests', () => {
    it('page prop', () => {
      const sut = new SearchParams();
      const teste = sut.page;
      expect(sut.page).toEqual(1);
    });
    const params = [
      { page: null as any, expected: 1 },
      { page: undefined as any, expected: 1 },
      { page: '' as any, expected: 1 },
      { page: 'test' as any, expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true as any, expected: 1 },
      { page: false as any, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    params.forEach(i => {
      expect(new SearchParams({ page: i.page }).page).toBe(i.expected);
    });
  });
});
