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


let db = {};
let id = 0;

function write() {
  window.localStorage.setItem('motherapp.db', JSON.stringify(db));
  window.localStorage.setItem('motherapp.db.lastId', id);
}
function read() {
  db = JSON.parse(window.localStorage.getItem('motherapp.db')) || {};
  id = JSON.parse(window.localStorage.getItem('motherapp.db.lastId')) || 0;
}

function processRequest(type, resource, params) {

  // console.log(type, ' ', resource, ' ', params);

  switch (type) {
    case GET_LIST:
      if (!db[resource]) {
        return {data: [], total: 0};
      }
      const list = Object.values(db[resource]);
      return {data: list, total: list.length};
    case GET_ONE:
      if (!db[resource]) {
        return {data: null};
      }
      const item = db[resource][params.id];
      return {data: item};
    case CREATE: {
      const data = params.data;
      data.id = id++;
      if (!db[resource]) {
        db[resource] = {};
      }
      db[resource][data.id] = data;
      write();
      return {data};
    }
    case UPDATE: {
      const data = params.data;
      db[resource][data.id] = data;
      write();
      return {data};
    }
    case UPDATE_MANY:
    case DELETE:
      delete db[resource][params.id];
      write();
      return;
    case DELETE_MANY:
    case GET_MANY:
      if (!db[resource]) {
        return {data: [], total: 0};
      }
      const filteredList = Object.values(db[resource]).filter((item) => params.ids.indexOf(item.id) >= 0);
      return {data: filteredList};
    case GET_MANY_REFERENCE:
      return;
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
}

read();
export default processRequest;
