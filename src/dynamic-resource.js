import { EField, EType } from './meta/consts';

const Examples = {
  Person: {
    id: 1,
    name: 'Roy',
    birthday: new Date(),
    veggie: false
  }
};


function exampleToEntity(name, example) {
  return {
    name: name.toLowerCase(),
    title: name,
    fields: Object.keys(example).map((key) => {
      const value = example[key];
      const field = {name: key};
      if (key.toLowerCase() === "id") {
        field.disabled = true;
      }
      field.type = getType(value);
      return field;
    })
  }
}

function getType(value) {
  if (value instanceof Date) {
    return EType.Date;
  }
  if (typeof value === "string") {
    return EType.String;
  }
  if (typeof value === "number") {
    return EType.Number;
  }
  if (typeof value === "boolean") {
    return EType.Boolean;
  }
  if (Array.isArray(value)) {
    return EType.List;
  }
  throw new Error("Unknown value type for " + value);
}

const Entities = [
  {
    name: "users",
    title: "Users",
    fields: [
      {name: "id", label: "Id", type: EType.String, disabled: true},
      {name: "name", label: "Name", type: EType.String},
      {name: "username", label: "Username", type: EType.String},
      {name: "email", label: "Email", type: EType.String}
    ]
  },
  {
    name: 'posts',
    title: 'Posts',
    fields: [
      {name: "id", label: "Id", type: EType.String, disabled: true},
      {name: "title", label: "Title", type: EType.String},
      {name: "body", label: "Body", type: EType.String},
      {
        name: "likes", type: EType.List, fields: [
        {name: "from", label: "From", type: EType.String}
      ]
      }
    ]
  }
];

for (let key in Examples) {
  Entities.push(exampleToEntity(key, Examples[key]));
}


function entityToModel(entity) {
  return {
    name: entity.name,
    list: {
      title: entity.title,
      fields: entity.fields.map(convertToField).concat([{type: EField.EditButton}])
    },
    edit: {
      title: "Edit " + entity.title,
      inputs: entity.fields.map(convertToInput)
    },
    create: {
      title: "Create New " + entity.title,
      inputs: entity.fields.map(convertToInput)
    }
  }
}

function convertToField(fieldData) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (rest.display) {
    rest.display = convertToField(rest.display);
  }
  if (rest.fields) {
    rest.fields = rest.fields.map(convertToField)
  }
  return {source: fieldData.name, type: fieldData.type.f, ...rest};
}

function convertToInput(fieldData) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (rest.display) {
    rest.display = convertToInput(rest.display);
  }
  if (rest.fields) {
    rest.fields = rest.fields.map(convertToInput);
  }
  return {source: fieldData.name, type: fieldData.type.i, ...rest};
}

class DynamicResources {

  constructor() {
    this.resources = Entities.map(entityToModel);
    this.updateListeners = [];
    this.key = 0;

    this.assignKeys(this.resources);
    console.log(this.resources);
  }

  onUpdate(f) {
    if (typeof f === "function") {
      this.updateListeners.push(f);
    }
  }

  update() {
    for (let func of this.updateListeners) {
      func();
    }
  }

  assignKeys(obj) {
    if (!obj) {
      return;
    }
    if (typeof obj !== 'object') {
      return;
    }
    obj.key = this.key++;
    const keys = Object.keys(obj);
    for (let key of keys) {
      this.assignKeys(obj[key]);
    }
  }

}

export default new DynamicResources();
