/**
 * Created by rbass on 8/6/18.
 * This data provider is supposed to bridge gap between typical server apis without pagination, sorting and filter,
 * and a client application with all these features.  It does so by doing these actions on the client side.
 */


import customDataProvider from './customizable-dataprovider';
import localDataProvider from './local-dataprovider';
import modelProvider from './modelprovider';
import { CREATE, DELETE, DELETE_MANY, UPDATE, UPDATE_MANY } from 'react-admin';


class EntityDataProvider {

  constructor() {
    this.updateListeners = [];
    this.entityToDataprovider = {};
    this.operationsWithUpdate = [CREATE, UPDATE, UPDATE_MANY, DELETE, DELETE_MANY];
  }

  onUpdate(f) {
    if (typeof f === "function") {
      this.updateListeners.push(f);
    }
  }

  update(resource, value) {
    for (let func of this.updateListeners) {
      func(resource, value);
    }
  }

  withUpdate(resource, value) {
    this.update(resource, value);
    return value;
  }

  getProvider(entity) {
    if (!this.entityToDataprovider[entity.name]) {
      this.entityToDataprovider[entity.name] = customDataProvider.processRequest;
    }
    return this.entityToDataprovider[entity.name];
  }

  processRequest(type, resource, params) {
    if (resource === 'entity') {
      return localDataProvider.processRequest(type, resource, params);
    }
    return this._getEntity(resource).then(entity => {
      const dataProvider = this.getProvider(entity);
      if (this.operationsWithUpdate.indexOf(type) >= 0) {
        return this.withUpdate(resource, dataProvider(type, resource, params));
      }
      return dataProvider(type, resource, params);
    });
  }

  _getEntity(resource) {
    return modelProvider.getModel().then(model => {
        return model.data.find((entity) => entity.resourceName === resource);
      }
    );
  }
}

export default new EntityDataProvider();
