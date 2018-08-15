import React from 'react';
import { Datagrid, List } from 'react-admin';
import generateField from './field';
import generateFilters from './filters';

function generateList(listDef, filtersDef) {
  if (!listDef) {
    return listDef;
  }

  return (props) => (
    <List key='list' title={listDef.title} {...props} filters={generateFilters(filtersDef)}>
      <Datagrid>
        {listDef.fields.map((field) => generateField(field))}
      </Datagrid>
    </List>
  )
}

export default generateList;
