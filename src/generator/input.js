import React from 'react';

import { EInput } from '../meta/consts';
import generateField from './field';
import IconSelect from '../component/icon-select';
import optionRenderer from '../component/option-renderer';
import ActionButton from '../component/action-button';
import { JsonInput } from '../component/jsonView'


import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  DateInput,
  DisabledInput,
  LongTextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleFormIterator,
  TextInput
} from 'react-admin';


function generateInput(input) {
  const params = Object.assign({}, input);
  delete params.type;
  delete params.rangeStyles;

  if (input.readOnly && input.type !== EInput.ReferenceMany) {
    return (<DisabledInput {...params}/>);
  }
  switch (input.type) {
    case EInput.DisabledInput:
      return (<DisabledInput {...params}/>);
    case EInput.BooleanInput:
      return (<BooleanInput {...params}/>);
    case EInput.TextInput:
      return (<TextInput {...params}/>);
    case EInput.NumberInput:
      return (<NumberInput {...params}/>);
    case EInput.JsonInput:
      return (<JsonInput {...params}/>);
    case EInput.LongTextInput:
      return (<LongTextInput {...params}/>);
    case EInput.SelectInput:
      return (<SelectInput {...params} optionText={optionRenderer} translateChoice={false}/>);
    case EInput.DateInput:
      return (<DateInput {...params}/>);
    case EInput.AutocompleteInput:
      return (<AutocompleteInput {...params}/>);
    case EInput.IconInput:
      return (<IconSelect {...params}/>);
    case EInput.ImageInput:
      return (<LongTextInput {...params}/>);
    case EInput.ReferenceInput:
      return (
        <ReferenceInput {...params}>
          {generateInput(params.display)}
        </ReferenceInput>);
    case EInput.ArrayInput:
      return (
        <ArrayInput {...params}>
          <SimpleFormIterator>
            {input.fields.map(generateInput)}
          </SimpleFormIterator>
        </ArrayInput>
      );
    case EInput.ReferenceMany:
      return generateField(input);
    case EInput.ActionField:
      return (<ActionButton {...params}/>);
    default:
      throw new Error("Unknown input type " + input.type);
  }
}

export default generateInput;
