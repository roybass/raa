/**
 * Super-simple LocalStorage DB
 */
class LocalDB {
  constructor() {
    this.db = {};
    this.id = 0;
    this.readFromStorage();
  }

  writeToStorage() {
    window.localStorage.setItem('raa.db', JSON.stringify(this.db));
    window.localStorage.setItem('raa.db.lastId', this.id);
  }

  readFromStorage() {
    this.db = JSON.parse(window.localStorage.getItem('raa.db')) || {};
    this.id = JSON.parse(window.localStorage.getItem('raa.db.lastId')) || 0;
  }

  getList(resource) {
    if (!this.db[resource]) {
      return { data: [], total: 0 };
    }
    const data = Object.values(this.db[resource]);
    return { data, total: data.length };
  }

  getOne(resource, id) {
    if (!this.db[resource]) {
      return { data: null };
    }
    const item = this.db[resource][id];
    return { data: item };
  }

  save(resource, obj) {
    if (!obj.id) {
      obj.id = this.id++;
    }
    if (!this.db[resource]) {
      this.db[resource] = {};
    }
    this.db[resource][obj.id] = obj;
    this.writeToStorage();
    return { data: obj };
  }

  deleteOne(resource, id) {
    const data = this.db[resource][id];
    delete this.db[resource][id];
    this.writeToStorage();
    return { data };
  }

  deleteMany(resource, ids) {
    for (let id of ids) {
      delete this.db[resource][id];
    }
    this.writeToStorage();
    return { data: ids };
  }
}

export default new LocalDB();
