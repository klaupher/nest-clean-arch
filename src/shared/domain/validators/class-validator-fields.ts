import { validateSync } from 'class-validator';
import { FieldsErrors, ValidateFieldsInterface } from './validator-fields.interface';

export abstract class ClassValidatorFields<T> implements ValidateFieldsInterface<T> {
  errors: FieldsErrors = null;
  validateData: T = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validateData = data;
    }
    return !this.errors.length;
  }
}
