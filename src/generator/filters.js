import React from 'react';
import { Filter } from 'react-admin';
import generateInput from './input';

function generateFilter(filtesrDef) {
  if (!filtesrDef) {
    return;
  }

  return (
    <Filter key='listFilter'>
      {filtesrDef.fields.map((field) => generateInput(field))}
    </Filter>
  );
}

export default generateFilter;
