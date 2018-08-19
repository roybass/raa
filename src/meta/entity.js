import React from 'react';
import { EType } from '../meta/consts';
import {
  ArrayInput,
  BooleanInput,
  Create,
  Datagrid,
  DisabledInput,
  Edit,
  EditButton,
  Filter,
  FormTab,
  List,
  NumberField,
  NumberInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextField,
  TextInput
} from 'react-admin';

import { EntityActions } from '../dashboard/entity-actions';

function toIdAndName(someEnum) {
  return Object.keys(someEnum).map((item) => {
    return { id: item, name: item }
  });
}
const typeChoices = toIdAndName(EType);

const create = (props) => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="Summary">
        <TextInput source='title' label='Title'/>
        <TextInput source='resourceName' label='Entity Name'/>
        <TextInput source='endpoint' label='Base HTTP Endpoint'/>
      </FormTab>
      <FormTab label="Fields">
        <ArrayInput source='fields' label="Fields">
          <SimpleFormIterator>
            <TextInput source='name' label='Name' placeholder='Field name'/>
            <TextInput source='label' label='Label' placeholder='For Display'/>
            <SelectInput source="type" label='Type' choices={typeChoices}/>
            <BooleanInput source='required' label='Required'/>
            <BooleanInput source='readOnly' label='Read Only'/>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Create>
);

const edit = (props) => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Summary">
        <DisabledInput source='id' label='Id'/>
        <TextInput source='title' label='Title'/>
        <TextInput source='resourceName' label='Resource Name'/>
        <TextInput source='endpoint' label='Base HTTP Endpoint'/>
      </FormTab>
      <FormTab label="Fields">
        <ArrayInput source='fields' label="Fields">
          <SimpleFormIterator>
            <TextInput source='name' label='Name' placeholder='Field name'/>
            <TextInput source='label' label='Label' placeholder='For Display'/>
            <SelectInput source="type" label='Type' choices={typeChoices}/>
            <BooleanInput source='required' label='Required'/>
            <BooleanInput source='readOnly' label='Read Only'/>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ListFilters = (props) => (
  <Filter {...props}>
    <NumberInput source='id' label='Id'/>
    <TextInput source='title' label='Title'/>
    <TextInput source='resourceName' label='Resource Name' alwaysOn/>
    <TextInput source='endpoint' label='Base HTTP Endpoint'/>
  </Filter>
);

const list = (props) => (
  <List {...props} actions={<EntityActions/>} filters={<ListFilters />}>
    <Datagrid>
      <TextField source="resourceName" label="Name"/>
      <TextField source="title" label="Title"/>
      <TextField source='endpoint' label='Base HTTP Endpoint'/>
      <NumberField source="fields.length" label="Fields"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export default { list, create, edit };
