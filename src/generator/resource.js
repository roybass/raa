import React from 'react';
import { Resource } from 'react-admin';
import generateList from './list';
import generateEdit from './edit';
import generateCreate from './create';


function generateResource(resourceDef) {
  return (
    <Resource key={'resource-' + resourceDef.name}
              name={resourceDef.name}
              list={generateList(resourceDef.list, resourceDef.filters)}
              edit={generateEdit(resourceDef.edit)}
              create={generateCreate(resourceDef.create)}/>)
}

export default generateResource;
