import React from 'react';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
import mydataprovider from './api/local-dataprovider';
import endpointOperations from './meta/endpoint';
import entityOperations from './meta/entity';


// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {dynamicResources};
    mydataprovider.onUpdate((resource) => {
      if (resource === 'entity') {
        this.setState({dynamicResources});
      }
    });
  }

  render() {
    console.log('Rendering app');
    return (
      <Admin dataProvider={mydataprovider.processRequest.bind(mydataprovider)} title="React Admin Admin">
        {this.state.dynamicResources.getResources().map((item) => generateResource(item)) }
        <Resource name='endpoint' label='Endpoint' {...endpointOperations}/>
        <Resource name='entity' label='Entity' {...entityOperations}/>
      </Admin>
    )
  };
}

export default App;
