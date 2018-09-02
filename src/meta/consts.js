export const Operation = {
  List: 'List',
  Create: 'Create',
  Edit: 'Edit',
  Delete: 'Delete'
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

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
  string: {f: EField.TextField, i: EInput.TextInput},
  number: {f: EField.NumberField, i: EInput.NumberInput},
  boolean: {f: EField.BooleanField, i: EInput.BooleanInput},
  text: {f: EField.TextField, i: EInput.LongTextInput},
  date: {f: EField.DateField, i: EInput.DateInput},
  chip: {f: EField.ChipField, i: EInput.TextInput},
  select: {f: EField.TextField, i: EInput.SelectInput},
  reference: {f: EField.ReferenceField, i: EInput.ReferenceInput},
  list: {f: EField.ArrayField, i: EInput.ArrayInput},
  referencemany: {f: EField.ReferenceMany, i: EInput.ReferenceMany}
};
