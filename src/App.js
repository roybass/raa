import React from 'react';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
import localdataprovider from './api/local-dataprovider';
import entitydataprovider from './api/entity-dataprovider';
import entityOperations from './meta/entity';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.raHide = window.raHide;
    this.raModel = window.raModel;
    this.raTitle = window.raTitle;
    this.dataprovider = this.raHide ? entitydataprovider : localdataprovider;
    this.title = this.raTitle ? this.raTitle : 'React Admin Admin';
    //console.log(this.title);
  }

  render() {
    return (
      <Admin dataProvider={this.dataprovider.processRequest.bind(this.dataprovider)} title={this.title}>
        {dynamicResources.getResources(this.raModel).map((item) => generateResource(item)) }
        {this.raHide ? (<span/>) : <Resource name='entity' label='Entity' {...entityOperations}/>}
      </Admin>
    )
  };
}

export default App;
