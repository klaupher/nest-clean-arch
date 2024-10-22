export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidateFieldsInterface<TValidated> {
  errors: FieldsErrors;
  validateData: TValidated;
  validate(data: any): boolean;
}
