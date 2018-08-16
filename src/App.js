import React from 'react';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
import localdataprovider from './api/local-dataprovider';
import entitydataprovider from './api/entity-dataprovider';
import modelProvider from './api/modelprovider';
import entityOperations from './meta/entity';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.hide = window.raHide;
    this.dataprovider = this.raHide ? entitydataprovider : localdataprovider;
    this.title = window.raTitle ? window.raTitle : 'React Admin Admin';

    this.state = {
      error: null,
      isLoaded: false,
      model: null
    };

    const modelPromise = modelProvider.getModel();
    modelPromise.then((model) => {
      console.log('Resolved model ', model);
      this.setState({isLoaded: true, model: model, error: null});
    }).catch((err) => {
      console.log('Error: ', err);
      this.setState({isLoaded: false, model: null, error: err.message})
    });
  }

  render() {
    if (this.state.error) {
      return (<div>Error {JSON.stringify(this.state.error)}</div>);
    }
    if (!this.state.isLoaded) {
      return (<div>Loading...</div>);
    }
    return (
      <Admin dataProvider={this.dataprovider.processRequest.bind(this.dataprovider)} title={this.title}>
        {dynamicResources.getResources(this.state.model).map((item) => generateResource(item)) }
        {this.hide ? (<span/>) : <Resource name='entity' label='Entity' {...entityOperations}/>}
      </Admin>
    )
  };
}

export default App;
