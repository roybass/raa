import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import generateInput from './input';

function generateEdit(editDef) {
  if (!editDef) {
    return editDef;
  }

  return (props) => (
    <Edit title={editDef.title} {...props}>
      <SimpleForm>
        {editDef.inputs.map((input) => generateInput(input))}
      </SimpleForm>
    </Edit>
  )
}

export default generateEdit;
