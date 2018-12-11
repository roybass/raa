import React from 'react';
import dynamicResources from './dynamic-resource';
import { Admin, Resource } from 'react-admin';
import generateResource from './generator/resource';
import localdataprovider from './api/local-dataprovider';
import entitydataprovider from './api/entity-dataprovider';
import modelProvider from './api/modelprovider';
import entityOperations from './meta/entity';
import AuthProvider from './api/authProvider';

import { createMuiTheme } from '@material-ui/core/styles';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.hide = window.raHide || false;
    this.userLocalDB = window.localStorage.getItem("raa.useLocalDb") || false;
    this.dataprovider = this.userLocalDB ? localdataprovider : entitydataprovider;
    this.title = window.raTitle || 'React Admin Admin';
    this.theme = window.raTheme ? createMuiTheme(window.raTheme) : undefined;

    this.state = {
      error: null,
      isLoaded: false,
      model: null
    };

    const modelPromise = modelProvider.getModel();
    modelPromise.then((model) => {
      console.log('Resolved model ', model);
      this.setState({ isLoaded: true, model: model, error: null });
    }).catch((err) => {
      console.log('Error: ', err);
      this.setState({ isLoaded: false, model: null, error: err.message })
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
      <Admin authProvider={AuthProvider.provide()}
             dataProvider={this.dataprovider.processRequest.bind(this.dataprovider)}
             title={this.title}
             theme={this.theme}
      >
        {dynamicResources.getResources(this.state.model).map((item) => generateResource(item)) }
        {this.hide ? (<span/>) : <Resource name='entity' label='Entity' {...entityOperations}/>}
      </Admin>
    )
  };
}

export default App;
