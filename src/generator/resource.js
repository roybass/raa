import React from 'react';
import { Resource } from 'react-admin';
import generateList from './list';
import generateEdit from './edit';
import generateCreate from './create';
import generateShow from './show';


function generateResource(resourceDef) {
  return (
    <Resource key={'resource-' + resourceDef.name}
              name={resourceDef.name}
              list={generateList(resourceDef.list, resourceDef.filters)}
              edit={generateEdit(resourceDef.edit)}
              show={generateShow(resourceDef.show)}
              create={generateCreate(resourceDef.create)}/>)
}

export default generateResource;
