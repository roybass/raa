import React from 'react';
import { Create, SimpleForm, TabbedForm, FormTab } from 'react-admin';
import generateInput from './input';
import breakToTabs from './tabs';

function generateCreate(createDef) {
  if (!createDef) {
    return createDef;
  }
  const tabs = breakToTabs(createDef.inputs);
  if (tabs) {
    return (props) => (
      <Create title={createDef.title} {...props}>
        <TabbedForm redirect="list">
          {tabs.map(tab => (
            <FormTab label={tab.label}>
              {tab.inputs.map((input) => generateInput(input))}
            </FormTab>
          ))}
        </TabbedForm>
      </Create>
    )
  } else {
    return (props) => (
      <Create title={createDef.title} {...props}>
        <SimpleForm redirect="list">
          {createDef.inputs.map((input) => generateInput(input))}
        </SimpleForm>
      </Create>
    )
  }
}

export default generateCreate;
