import localDB from './localdb';

class ModelProvider {
  constructor() {
    this.modelP = this.resolveModel();
  }

  getModel() {
    return this.modelP;
  }

  resolveModel() {
    if (window.raModel) {
      console.log('Resolved model from window.raModel');
      return Promise.resolve(window.raModel);
    }
    if (window.raModelUrl) {
      console.log('Resolving model from window.raModelUrl');
      return fetch(window.raModelUrl)
        .then((response) => response.json());
    }
    console.log('Resolving model from LocalStorage');
    return Promise.resolve(localDB.getList('entity'));
  }
}

export default new ModelProvider();
