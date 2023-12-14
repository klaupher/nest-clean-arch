import { FieldErrors } from '../validators/validator-field.interface';

export class NotFoundError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
