import React from 'react';
import { EField, EInput, Method, Operation } from '../meta/consts';
import {
  ArrayInput,
  Create,
  Datagrid,
  DisabledInput,
  Edit,
  EditButton,
  FormDataConsumer,
  List,
  NumberField,
  SelectField,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  SimpleShowLayout,
  TextField,
  TextInput
} from 'react-admin';


function toIdAndName(someEnum) {
  return Object.keys(someEnum).map((item) => {
    return {id: item, name: item}
  });
}
const operationChoices = toIdAndName(Operation);
const inputChoices = toIdAndName(EInput);
const fieldChoices = toIdAndName(EField);
const methodChoices = toIdAndName(Method);


function generateOperation(formData, rest) {
  // console.log(JSON.stringify(formData) + ' ' + JSON.stringify(rest));
  const operation = formData.operation;
  if (!operation) {
    return;
  }
  switch (operation) {
    case Operation.Edit:
    case Operation.Create:
      return (
        <SimpleShowLayout>
          <TextInput source='endpoint' label='Endpoint'/>
          <SelectInput source='method' label='HTTP Method' choices={methodChoices}/>
          <ArrayInput source='fields' label="Input Fields">
            <SimpleFormIterator>
              <TextInput source='source' label='Source'/>
              <TextInput source='label'/>
              <SelectInput source="type" choices={inputChoices}/>
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleShowLayout>
      );
    case Operation.List:
      return (
        <SimpleShowLayout>
          <TextInput source='endpoint' label='Endpoint'/>
          <SelectInput source='method' label='HTTP Method' choices={methodChoices}/>
          <ArrayInput source='fields' label="List Columns">
            <SimpleFormIterator>
              <TextInput source='source' label='Source' placeholder='The value will be taken from this field'/>
              <TextInput source='label' label='Label'/>
              <SelectInput source="type" choices={fieldChoices}/>
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleShowLayout>
      );
    case Operation.Delete:
      return (
        <SimpleShowLayout>
          <TextInput source='endpoint' label='Endpoint'/>
          <SelectInput source='method' label='HTTP Method' choices={methodChoices}/>
          <TextInput source='idField' label='Id Field' placeholder='This field value will be added to the endpoint'/>
        </SimpleShowLayout>
      );
    default:
      throw new Error('Unknown operation ' + operation);
  }
}

const create = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='title' label='Title'/>
      <TextInput source='resourceName' label='Resource Name'/>
      <SelectInput source='operation' label='Operation' choices={operationChoices}/>
      <FormDataConsumer>
        {({formData, ...rest}) => (generateOperation(formData, rest))}
      </FormDataConsumer>
    </SimpleForm>
  </Create>
);

const edit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source='id'/>
      <TextInput source='title' label='Title'/>
      <TextInput source='resourceName' label='Resource Name'/>
      <SelectInput source='operation' label='Operation' choices={operationChoices}/>
      <FormDataConsumer>
        {({formData, ...rest}) => (generateOperation(formData, rest))}
      </FormDataConsumer>
    </SimpleForm>
  </Edit>
);


const list = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" label="Title"/>
      <TextField source="endpoint" label="Endpont"/>
      <TextField source="operation" label="Operation"/>
      <SelectField source="method" choices={methodChoices} label="Method"/>
      <NumberField source="fields.length" label="Fields"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export default {list, edit, create}
