import { EField, EType } from './meta/consts';

const Entities = [
  {
    name: 'person',
    title: 'Person',
    fields: [
      {name: 'id', label: 'Id', type: EType.Number, disabled: true},
      {name: 'name', label: 'Name', type: EType.String},
      {name: 'dob', label: 'Birthday', type: EType.Date}
    ]
  },
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
      {name: "body", label: "Body", type: EType.String}
    ]
  }
];

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
  return {source: fieldData.name, type: fieldData.type.f, ...rest};
}

function convertToInput(fieldData) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (rest.display) {
    rest.display = convertToInput(rest.display);
  }
  return {source: fieldData.name, type: fieldData.type.i, ...rest};
}


let key = 0;
function assignKeys(obj) {
  if (!obj) {
    return;
  }
  if (typeof obj !== 'object') {
    return;
  }
  obj.key = key++;
  const keys = Object.keys(obj);
  for (let key of keys) {
    assignKeys(obj[key]);
  }
}

const dynamicResources = Entities.map(entityToModel);
assignKeys(dynamicResources);

// console.log(dynamicResources);

export default dynamicResources;
