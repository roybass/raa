import React from 'react';
import { Datagrid, List } from 'react-admin';
import generateField from './field';
import generateFilters from './filters';
import generateActionButton from './action-button';
import ArrowsPagination from '../component/arrow-pagination';

function generateList(listDef, filtersDef) {
  if (!listDef) {
    return listDef;
  }

  return (props) => (
    <List key='list' title={listDef.title} bulkActions={listDef.bulkActions} {...props}
          filters={generateFilters(filtersDef)} pagination={<ArrowsPagination />}>
      <Datagrid>
        {listDef.fields.map((field) => generateField(field, 'list'))}
        {listDef.actions.map(generateActionButton)}
      </Datagrid>
    </List>
  )
}

export default generateList;
