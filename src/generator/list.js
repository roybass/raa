import React from 'react';
import { Datagrid, List } from 'react-admin';
import generateField from './field';
import generateFilters from './filters';
import generateBulkActionButtons from '../generator/bulk-action-buttons';
import ArrowsPagination from '../component/arrow-pagination';


function generateList(listDef, filtersDef) {
  if (!listDef) {
    return listDef;
  }

  return (props) => (
    <List key='list' title={listDef.title} bulkActionButtons={generateBulkActionButtons(listDef)} {...props}
          filters={generateFilters(filtersDef)} pagination={<ArrowsPagination />}>
      <Datagrid>
        {listDef.fields.map((field) => generateField(field, 'list'))}
      </Datagrid>
    </List>
  )
}

export default generateList;
