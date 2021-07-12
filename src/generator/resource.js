import React from 'react';
import { Resource } from 'react-admin';
import generateList from './list';
import generateGrid from './cards';
import generateEdit from './edit';
import generateCreate from './create';
import generateShow from './show';
import * as icons from '@material-ui/icons';

function generateResource(resourceDef) {
  return (
    <Resource key={'resource-' + resourceDef.name}
              name={resourceDef.name}
              icon={icons[resourceDef.icon]}
              list={listByType(resourceDef.listType, resourceDef)}
              edit={generateEdit(resourceDef.edit)}
              show={generateShow(resourceDef.show)}
              create={generateCreate(resourceDef.create)}/>)
}

function listByType(type, resourceDef) {
  switch (type) {
    case 'list':
      return generateList(resourceDef.list, resourceDef.filters);
    case 'cards':
      return generateGrid(resourceDef.list, resourceDef.filters);
    default:
      throw new Error("Unsupported list type " + type);
  }
}


export default generateResource;
