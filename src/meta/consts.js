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
  ArrayInput: "ArrayInput"
};

export const EType = {
  String: {f: EField.TextField, i: EInput.TextInput},
  Number: {f: EField.NumberField, i: EInput.NumberInput},
  Boolean: {f: EField.BooleanField, i: EInput.BooleanInput},
  Text: {f: EField.TextField, i: EInput.LongTextInput},
  Date: {f: EField.DateField, i: EInput.DateInput},
  Chip: {f: EField.ChipField, i: EInput.TextInput},
  Select: {f: EField.TextField, i: EInput.SelectInput},
  Reference: {f: EField.ReferenceField, i: EInput.ReferenceInput},
  List: {f: EField.ArrayField, i: EInput.ArrayInput},
  ReferenceMany: {f: EField.ReferenceMany, i: EInput.TextInput}
};
