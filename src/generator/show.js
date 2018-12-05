import React from 'react';
import { Show, SimpleShowLayout, TabbedShowLayout, Tab } from 'react-admin';
import generateField from './field';
import breakToTabs from './tabs';

function generateShow(showDef) {
  if (!showDef) {
    return showDef;
  }

  const tabs = breakToTabs(showDef.fields);
  if (tabs) {
    return (props) => (
      <Show title={showDef.title} {...props}>
        <TabbedShowLayout>
          {tabs.map(tab => (
            <Tab label={tab.label}>
              {tab.inputs.map((field) => generateField(field))}
            </Tab>
          ))}
        </TabbedShowLayout>
      </Show>
    )
  } else {
    return (props) => (
      <Show title={showDef.title} {...props}>
        <SimpleShowLayout>
          {showDef.fields.map((field) => generateField(field))}
        </SimpleShowLayout>
      </Show>
    )
  }
}

export default generateShow;
