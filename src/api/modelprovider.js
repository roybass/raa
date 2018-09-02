import localDB from './localdb';
import { DyplomaModel as ExampleModel} from './example-model';


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
    if (this.useExample) {
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
}

export default new ModelProvider();
