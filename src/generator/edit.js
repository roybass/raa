import React from 'react';
import { Edit, SimpleForm, TabbedForm, FormTab } from 'react-admin';
import generateInput from './input';
import breakToTabs from './tabs';

function generateEdit(editDef) {
  if (!editDef) {
    return editDef;
  }

  const tabs = breakToTabs(editDef.inputs);
  if (tabs) {
    return (props) => (
      <Edit title={editDef.title} {...props}>
        <TabbedForm>
          {tabs.map(tab => (
            <FormTab label={tab.label}>
              {tab.inputs.map((input) => generateInput(input))}
            </FormTab>
          ))}
        </TabbedForm>
      </Edit>
    )
  } else {
    return (props) => (
      <Edit title={editDef.title} {...props}>
        <SimpleForm>
          {editDef.inputs.map((input) => generateInput(input))}
        </SimpleForm>
      </Edit>
    )
  }
}

export default generateEdit;
