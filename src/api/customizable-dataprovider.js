/**
 * Created by rbass on 8/6/18.
 * This data provider is supposed to bridge gap between typical server apis without pagination, sorting and filter,
 * and a client application with all these features.  It does so by doing these actions on the client side.
 */


import simpleRestProvider from 'ra-data-simple-rest';
import modelProvider from './modelprovider';
import mustache from 'mustache';
import { CREATE, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, UPDATE } from 'react-admin';


class CustomizableDataProvider {


  constructor() {
    this.processRequest = this.processRequest.bind(this);
  }

  processRequest(type, resource, params) {
    console.log('Processing ', type, resource, params);
    return this._getEntity(resource).then(entity => {
      if (entity.customEndpoints) {
        const endpointDef = this.getCustomEndpoint(type, entity, params);
        if (endpointDef) {
          return this.runCustomEndpoint(endpointDef, entity, params);
        }
      }
      return simpleRestProvider(entity.endpoint)(type, resource, params);
    });
  }

  runCustomEndpoint(endpointDef, entity, params) {

    const url = this.buildCustomUrl(endpointDef, entity, params);
    const body = this.getBody(params);
    const headers = this.getHeaders(params);
    const method = endpointDef.method || "GET";
    const req = new Request(url, { method, body, headers });

    return fetch(req).then(res => res.json()).then(data => {
      return { data, total: data.length };
    });
  }

  getBody(params) {
    return JSON.stringify(params.data);
  }

  getHeaders(params) {
    return {
      'Content-Type': 'application/json'
    };
  }

  buildCustomUrl(endpoint, entity, params) {

    let view = {
      limit: this._getLimit(params),
      offset: this._getOffset(params),
      id: params.id
    };
    view = Object.assign(view, endpoint.params);
    const endpointUrl = (entity.customEndpoints.baseUrl || '')  + endpoint.url;
    return mustache.render(endpointUrl, view);
  }

  getCustomEndpoint(type, entity, params) {
    const { customEndpoints }  = entity;
    switch (type) {
      case GET_LIST:
        if (params.filter && customEndpoints.getBy) {
          for (let filterKey in params.filter) {
            if (params.filter.hasOwnProperty(filterKey) && customEndpoints.getBy.hasOwnProperty(filterKey)) {
              const by = customEndpoints.getBy[filterKey];
              return {
                url: by.url,
                method: by.method,
                params: {
                  [filterKey]: params.filter[filterKey]
                }
              }

            }
          }
        }
        return customEndpoints.list;
      case GET_ONE:
        return customEndpoints.get;
      case UPDATE:
        return customEndpoints.update;
      case CREATE:
        return customEndpoints.create;
      case GET_MANY:
        return Object.assign({ params: { offset: 0, limit: 1000 } }, customEndpoints.list);
      case GET_MANY_REFERENCE:
        return customEndpoints.getBy ? customEndpoints.getBy[params.target] : null;
      default:
        console.log('Operation not supported ', type, entity);
        return;
    }
  }

  _getLimit(params) {
    if (params && params.pagination) {
      return params.pagination.perPage;
    }
  }

  _getOffset(params) {
    if (params && params.pagination) {
      return (params.pagination.page - 1) * params.pagination.perPage;
    }
  }


  _getEntity(resource) {
    return modelProvider.getModel().then(model => {
        console.log('data', model, resource);
        return model.data.find((entity) => entity.resourceName === resource);
      }
    );
  }

}

export default new CustomizableDataProvider();
