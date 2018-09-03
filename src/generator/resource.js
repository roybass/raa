import React from 'react';
import { Resource } from 'react-admin';
import generateList from './list';
import generateEdit from './edit';
import generateCreate from './create';
import generateShow from './show';
import * as icons from '@material-ui/icons';

function generateResource(resourceDef) {
  return (
    <Resource key={'resource-' + resourceDef.name}
              name={resourceDef.name}
              icon={icons[resourceDef.icon]}
              list={generateList(resourceDef.list, resourceDef.filters)}
              edit={resourceDef.readOnly ? generateShow(resourceDef.show) : generateEdit(resourceDef.edit)}
              show={generateShow(resourceDef.show)}
              create={generateCreate(resourceDef.create)}/>)
}

export default generateResource;
