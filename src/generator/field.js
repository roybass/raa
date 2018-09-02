import { EField } from '../meta/consts';
import React from 'react';
import {
  ArrayField,
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  EmailField,
  FunctionField,
  ImageField,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  SingleFieldList,
  SelectField,
  ShowButton,
  ChipField,
  TextField,
  UrlField
} from 'react-admin';


function generateField(field) {
  switch (field.type) {
    case EField.TextField:
      return (<TextField {...field}/>);
    case EField.ChipField:
      return (<ChipField {...field}/>);
    case EField.EmailField:
      return (<EmailField {...field}/>);
    case EField.ReferenceField:
      return (
        <ReferenceField {...field}>
          {generateField(field.display)}
        </ReferenceField>);
    case EField.EditButton:
      return (<EditButton {...field}/>);
    case EField.ShowButton:
      return (<ShowButton {...field}/>);
    case EField.BooleanField:
      return (<BooleanField {...field}/>);
    case EField.DateField:
      return (<DateField {...field}/>);
    case EField.ImageField:
      return (<ImageField {...field}/>);
    case EField.NumberField:
      return (<NumberField {...field}/>); // See this for options: https://marmelab.com/react-admin/Fields.html#numberfield
    case EField.SelectField:
      return (<SelectField {...field}/>);
    case EField.UrlField:
      return (<UrlField {...field}/>);
    case EField.FunctionField:
      return (<FunctionField {...field}/>);
    case EField.ArrayField:
      return (
        <ArrayField {...field}>
          <Datagrid>
            {field.fields.map(generateField)}
          </Datagrid>
        </ArrayField>);
    case EField.ReferenceMany:
      const rest = Object.assign({}, field);
      delete rest.source;
      return (
        <ReferenceManyField {...rest}>
          <SingleFieldList>
            {generateField(field.display)}
          </SingleFieldList>
        </ReferenceManyField>
      );
    default:
      throw new Error("Unknown field type " + field.type);
  }
}


export default generateField;
