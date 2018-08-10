import React from 'react';
import { Datagrid, List } from 'react-admin';
import generateField from './field';

function generateList(listDef) {
  if (!listDef) {
    return listDef;
  }

  return (props) => (
      <List key='list' title={listDef.title} {...props}>
        <Datagrid>
          {listDef.fields.map((field) => generateField(field))}
        </Datagrid>
      </List>
  )
}

export default generateList;
