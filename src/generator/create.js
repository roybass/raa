import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import generateInput from './input';

function generateCreate(createDef) {
  if (!createDef) {
    return createDef;
  }

  return (props) => (
    <Create title={createDef.title} {...props}>
      <SimpleForm>
        {createDef.inputs.map((input) => generateInput(input))}
      </SimpleForm>
    </Create>
  )
}

export default generateCreate;
