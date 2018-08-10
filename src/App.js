import React from 'react';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
// import jsonServerProvider from 'ra-data-json-server';
import mydataprovider from './api/dataprovider';
import { ResourceCreate, ResourceList, ResourceEdit } from './meta/resource';


// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => {
  return (
      <Admin dataProvider={mydataprovider} title="React Admin Admin">
        {dynamicResources.map((item) => generateResource(item)) }
        <Resource name='Endpoint' create={ResourceCreate} edit={ResourceEdit} list={ResourceList}/>
      </Admin>
  )
};


export default App;
