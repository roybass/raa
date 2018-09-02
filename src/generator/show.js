import React from 'react';
import { Show, SimpleShowLayout } from 'react-admin';
import generateField from './field';

function generateShow(showDef) {
  if (!showDef) {
    return showDef;
  }

  return (props) => (
    <Show title={showDef.title} {...props}>
      <SimpleShowLayout>
        {showDef.fields.map((field) => generateField(field))}
      </SimpleShowLayout>
    </Show>
  )
}

export default generateShow;
