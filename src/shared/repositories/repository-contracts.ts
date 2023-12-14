import { BaseEntity } from '@/shared/domain/entities/base';

export interface RepositoryInterface<E extends BaseEntity> {
  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<E>;
  findAll(): Promise<E[]>;
}
