export const EField = {
  TextField: "TextField",
  ChipField: "ChipField",
  EmailField: "EmailField",
  ReferenceField: "ReferenceField",
  EditButton: "EditButton",
  ShowButton: "ShowButton",
  BooleanField: "BooleanField",
  DateField: "DateField",
  NumberField: "NumberField",
  SelectField: "SelectField",
  FunctionField: "FunctionField",
  UrlField: "UrlField",
  ArrayField: "ArrayField",
  ReferenceMany: "ReferenceMany"
};

export const EInput = {
  DisabledInput: "DisabledInput",
  BooleanInput: "BooleanInput",
  TextInput: "TextInput",
  NumberInput: "NumberInput",
  LongTextInput: "LongTextInput",
  SelectInput: "SelectInput",
  DateInput: "DateInput",
  AutocompleteInput: "AutocompleteInput",
  ImageInput: "ImageInput",
  ReferenceInput: "ReferenceInput",
  ArrayInput: "ArrayInput",
  ReferenceMany: "ReferenceMany"
};

export const EType = {
  string: { field: EField.TextField, input: EInput.TextInput, filter: EInput.TextInput },
  number: { field: EField.NumberField, input: EInput.NumberInput, filter: EInput.NumberInput },
  boolean: { field: EField.BooleanField, input: EInput.BooleanInput, filter: EInput.BooleanInput },
  text: { field: EField.TextField, input: EInput.LongTextInput, filter: EInput.LongTextInput },
  date: { field: EField.DateField, input: EInput.DateInput, filter: EInput.DateInput },
  url: { field: EField.UrlField, input: EInput.TextInput, filter: EInput.TextInput },
  chip: { field: EField.ChipField, input: EInput.TextInput, filter: EInput.TextInput },
  select: { field: EField.TextField, input: EInput.SelectInput, filter: EInput.SelectInput },
  enum: { field: EField.SelectField, input: EInput.SelectInput, filter: EInput.SelectInput },
  reference: { field: EField.ReferenceField, input: EInput.ReferenceInput, filter: EInput.TextInput },
  list: { field: EField.ArrayField, input: EInput.ArrayInput, filter: EInput.ArrayInput },
  referencemany: { field: EField.ReferenceMany, input: EInput.ReferenceMany, filter: EInput.TextInput },
  function: { field: EField.FunctionField, input: EInput.TextInput, filter: EInput.TextInput }
};
