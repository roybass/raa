import React from 'react';
import dashboard from './dashboard/dashboard';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
import localdataprovider from './api/local-dataprovider';
import entitydataprovider from './api/local-dataprovider';
import entityOperations from './meta/entity';


// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {dynamicResources};
    this.dataprovider = window.raHide ? entitydataprovider : localdataprovider;

    this.dataprovider.onUpdate((resource) => {
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
      <Admin dashboard={dashboard} dataProvider={this.dataprovider.processRequest.bind(this.dataprovider)}
             title="React Admin Admin">
        {this.state.dynamicResources.getResources(this.state.raModel).map((item) => generateResource(item)) }
        {this.state.raHide ? (<span/>) : <Resource name='entity' label='Entity' {...entityOperations}/>}
      </Admin>
    )
  };
}

export default App;
