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
    this.raHide = window.raHide;
    this.raModel= window.raModel;
    this.dataprovider = window.raHide ? entitydataprovider : localdataprovider;
    this.title = 'this.raHide' ? 'Management App' : 'React Admin Admin';
  }

  render() {
    return (
      <Admin dashboard={dashboard} dataProvider={this.dataprovider.processRequest.bind(this.dataprovider)}
             title={this.title}>
        {dynamicResources.getResources(this.raModel).map((item) => generateResource(item)) }
        {this.raHide ? (<span/>) : <Resource name='entity' label='Entity' {...entityOperations}/>}
      </Admin>
    )
  };
}

export default App;
