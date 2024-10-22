export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidateFieldsInterface<TValidated> {
  errors: FieldsErrors;
  validatedData: TValidated;
  validate(data: any): boolean;
}
