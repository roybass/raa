import { EField, EType } from './meta/consts';
import { required } from 'react-admin';
/*
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
 */

function entityToModel(entity) {
  return {
    name: entity.resourceName,
    list: {
      title: entity.title,
      fields: convertToFields(entity.fields)
    },
    edit: {
      title: "Edit " + entity.title,
      inputs: convertToInputs(entity.fields)
    },
    create: {
      title: "Create New " + entity.title,
      inputs: convertToInputs(entity.fields)
    },
    filters: {
      fields: convertToFilterInputs(entity.fields)
    }
  }
}

function convertToFields(fieldDataArr) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.map(convertToField).concat([{ type: EField.EditButton }]);
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
  if (rest.choices) {
    rest.choices = rest.choices.map(choice => {
      return { id: choice, name: choice };
    });
  }
  if (rest.required === true) {
    rest.validate = [required()];
  }
  return { source: fieldData.name, type: EType[fieldData.type].f, ...rest };
}

function convertToInputs(fieldDataArr) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.map(convertToInput);
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
  if (rest.choices) {
    rest.choices = rest.choices.map(choice => {
      return { id: choice, name: choice };
    });
  }

  if (rest.required === true) {
    rest.validate = [required()];
  }
  return { source: fieldData.name, type: EType[fieldData.type].i, ...rest };
}

function convertToFilterInputs(fieldDataArr) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.filter(item => item.type !== 'List').map(convertToFilterInput);
}

function convertToFilterInput(fieldData) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (rest.display) {
    rest.display = convertToInput(rest.display);
  }
  return { source: fieldData.name, type: EType[fieldData.type].i, ...rest };
}


class DynamicResources {

  constructor() {
    this.updateListeners = [];
    this.key = 0;

    this.assignKeys(this.resources);
  }

  getResources(model) {
    const resources = model.data.map(entityToModel);
    this.assignKeys(resources);
    console.log(resources);
    return resources;
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
