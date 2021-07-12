import localDB from './localdb';
import { BandsModel as ExampleModel } from './example-model';


class ModelProvider {
  constructor() {
    this.useExample = localStorage.getItem("raa.useExample") || false;
    this.modelP = this.resolveModel().then(model => {
      this.model = model;
      return model;
    });
  }

  getModel() {
    return this.modelP;
  }

  getModelSync() { // Dangerous. This could be undefined and update later.
    return this.model;
  }

  resolveModel() {
    const queryParamModel = this.getQueryVariable('model');
    if (queryParamModel) {
      console.log('Resolving model from query parameter');
      return fetch(queryParamModel).then((response) => response.json());
    }
    if (this.useExample) {
      console.log('Resolving example model');
      return Promise.resolve(ExampleModel);
    }
    if (window.raModel) {
      console.log('Resolved model from window.raModel');
      return Promise.resolve(window.raModel);
    }
    if (window.raModelUrl) {
      console.log('Resolving model from window.raModelUrl');
      return fetch(window.raModelUrl).then((response) => response.json());
    }
    console.log('Resolving model from LocalStorage');
    return Promise.resolve(localDB.getList('entity'));
  }


  getQueryVariable(paramName) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let param of vars) {
      const pair = param.split('=');
      if (decodeURIComponent(pair[0]) === paramName) {
        return decodeURIComponent(pair[1]);
      }
    }
  }
}

export default new ModelProvider();
