import React from 'react';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
import mydataprovider from './api/local-dataprovider';
import { ResourceCreate, ResourceEdit, ResourceList } from './meta/endpoint';
import entityOperations from './meta/entity';


// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: dynamicResources};
    dynamicResources.onUpdate(() => {
      this.setState({data: dynamicResources});
    });
  }

  render() {
    return (
      <Admin dataProvider={mydataprovider} title="React Admin Admin">
        {dynamicResources.resources.map((item) => generateResource(item)) }
        <Resource name='Endpoint' create={ResourceCreate} edit={ResourceEdit} list={ResourceList}/>
        <Resource name='Entity' {...entityOperations}/>
      </Admin>
    )
  };
}

export default App;
