import { EField } from '../meta/consts';
import React from 'react';
import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  EmailField,
  FunctionField,
  ImageField,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  SelectField,
  ShowButton,
  SingleFieldList,
  TextField,
  UrlField
} from 'react-admin';


function generateField(field, context) {
  const rest = Object.assign({}, field);
  switch (field.type) {
    case EField.TextField:
      return (<TextField {...field}/>);
    case EField.ChipField:
      return (<ChipField {...field}/>);
    case EField.EmailField:
      return (<EmailField {...field}/>);
    case EField.ReferenceField:
      rest.linkType = field.readOnly === true ? 'show' : 'edit';
      return (
        <ReferenceField {...rest}>
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
      delete rest.source;
      delete rest.perPageList;
      delete rest.perPageEdit;
      rest.perPage = (context === 'list' ? (field.perPageList || 10) : (field.perPageEdit || 2000));
      const linkParams = {
        linkType : field.readOnly === true ? 'show' : 'edit'
      };
      return (
        <ReferenceManyField {...rest}>
          <SingleFieldList {...linkParams}>
            {generateField(field.display)}
          </SingleFieldList>
        </ReferenceManyField>
      );
    default:
      throw new Error("Unknown field type " + field.type);
  }
}


export default generateField;
