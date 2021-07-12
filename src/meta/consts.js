export const EField = {
  TextField: "TextField",
  ChipField: "ChipField",
  JsonField: "JsonField",
  EmailField: "EmailField",
  ReferenceField: "ReferenceField",
  EditButton: "EditButton",
  ShowButton: "ShowButton",
  BooleanField: "BooleanField",
  DateField: "DateField",
  NumberField: "NumberField",
  IconField: "IconField",
  SelectField: "SelectField",
  FunctionField: "FunctionField",
  UrlField: "UrlField",
  ImageField: "ImageField",
  ArrayField: "ArrayField",
  ActionField: "ActionField",
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
  IconInput: "IconInput",
  ReferenceInput: "ReferenceInput",
  ArrayInput: "ArrayInput",
  ActionField: "ActionField",
  ReferenceMany: "ReferenceMany",
  JsonInput: "JsonInput"
};

export const EVisibility = {
  list: 'list',
  edit: 'edit',
  create: 'create',
  show: 'show',
  filter: 'filter'
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
  image: { field: EField.ImageField, input: EInput.ImageInput, filter: null },
  icon: { field: EField.IconField, input: EInput.IconInput, filter: EInput.IconInput },
  reference: { field: EField.ReferenceField, input: EInput.ReferenceInput, filter: EInput.TextInput },
  list: { field: EField.ArrayField, input: EInput.ArrayInput, filter: null },
  referencemany: { field: EField.ReferenceMany, input: EInput.ReferenceMany, filter: null },
  action: { field: EField.ActionField, input: EInput.ActionField, filter: null },
  function: { field: EField.FunctionField, input: EInput.TextInput, filter: EInput.TextInput },
  json: { field: EField.JsonField, input: EInput.JsonInput, filter: EInput.TextInput }
};
