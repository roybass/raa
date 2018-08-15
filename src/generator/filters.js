import React from 'react';
import { Datagrid, Filter, List } from 'react-admin';
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
