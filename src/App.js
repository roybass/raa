import React from 'react';
import dashboard from './dashboard/dashboard';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
import mydataprovider from './api/local-dataprovider';
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

  componentDidMount() {
    this.setState({
      raHide: window.raHide,
      raModel: window.raModel
    });
  }

  render() {
    // console.log('Rendering app');
    return (
      <Admin dashboard={dashboard} dataProvider={mydataprovider.processRequest.bind(mydataprovider)}
             title="React Admin Admin">
        {this.state.dynamicResources.getResources(this.state.raModel).map((item) => generateResource(item)) }
        {this.state.raHide ? (<span/>) : <Resource name='entity' label='Entity' {...entityOperations}/>}
      </Admin>
    )
  };
}

export default App;
