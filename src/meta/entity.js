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
  List,
  NumberField,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput
} from 'react-admin';


function toIdAndName(someEnum) {
  return Object.keys(someEnum).map((item) => {
    return {id: item, name: item}
  });
}
const typeChoices = toIdAndName(EType);

const create = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='title' label='Title'/>
      <TextInput source='resourceName' label='Resource Name'/>
      <ArrayInput source='fields' label="Fields">
        <SimpleFormIterator>
          <TextInput source='name' label='Name' placeholder='Field name'/>
          <TextInput source='label' label='Label' placeholder='For Display'/>
          <SelectInput source="type" label='Type' choices={typeChoices}/>
          <BooleanInput source='disabled' label='Read Only'/>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

const edit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source='id' label='Id'/>
      <TextInput source='title' label='Title'/>
      <TextInput source='resourceName' label='Resource Name'/>
      <ArrayInput source='fields' label="Fields">
        <SimpleFormIterator>
          <TextInput source='name' label='Name' placeholder='Field name'/>
          <TextInput source='label' label='Label' placeholder='For Display'/>
          <SelectInput source="type" label='Type' choices={typeChoices}/>
          <BooleanInput source='disabled' label='Read Only'/>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

const list = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" label="Name"/>
      <TextField source="title" label="Title"/>
      <NumberField source="fields.length" label="Fields"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export default {list, create, edit};
