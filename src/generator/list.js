import React from 'react';
import { Datagrid, List } from 'react-admin';
import generateField from './field';
import generateFilters from './filters';
import generateActionButton from './action-button';

import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';

const ArrowsPagination = ({ page, perPage, total, setPage }) => {
  const nbPages = Math.ceil(total / perPage) || 1;
  return (
    nbPages > 1 &&
    <Toolbar>
      <span style={{margin: 'auto'}}>
      {page > 1 &&
      <Button  key="prev" onClick={() => setPage(page - 1)}>
        <ChevronLeft />
        Prev
      </Button>
      }
      {page !== nbPages &&
      <Button key="next" onClick={() => setPage(page + 1)}>
        Next
        <ChevronRight />
      </Button>
      }
      </span>
    </Toolbar>
  );
};


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
