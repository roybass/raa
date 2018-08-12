/**
 * Created by rbass on 8/6/18.
 * This data provider is supposed to bridge gap between typical server apis without pagination, sorting and filter,
 * and a client application with all these features.  It does so by doing these actions on the client side.
 */

import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY
} from 'react-admin';
import localDB from './localdb';

function processRequest(type, resource, params) {

  // console.log(type, ' ', resource, ' ', params);

  switch (type) {
    case GET_LIST:
      return localDB.getList(resource);
    case GET_ONE:
      return localDB.getOne(resource, params.id);
    case CREATE:
      return localDB.save(resource, params.data);
    case UPDATE:
      return localDB.save(resource, params.data);
    case UPDATE_MANY:
      throw new Error('Unsupported Operation ' + type);
    case DELETE:
      return localDB.deleteOne(resource, params.id);
    case DELETE_MANY:
      throw new Error('Unsupported Operation ' + type);
    case GET_MANY:
      const filteredList = localDB.getList(resource).data.filter((item) => params.ids.indexOf(item.id) >= 0);
      return {data: filteredList};
    case GET_MANY_REFERENCE:
      throw new Error('Unsupported Operation ' + type);
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
}

export default processRequest;
