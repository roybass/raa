import { EField, EType } from './meta/consts';
import { required } from 'react-admin';

function capitalize(str) {
  if (!str) {
    return;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
  if (!rest.label) {
    rest.label = capitalize(rest.name);
  }
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
  if (!rest.readOnly && rest.required === true) {
    rest.validate = [required()];
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].f, ...rest };
}

const noInputFields = ['ReferenceMany'];
function convertToInputs(fieldDataArr) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.filter(item => noInputFields.indexOf(item.type) === -1).map(convertToInput);
}

function convertToInput(fieldData) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (!rest.label) {
    rest.label = capitalize(rest.name);
  }
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

  if (!rest.readOnly && rest.required === true) {
    rest.validate = [required()];
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].i, ...rest };
}

const noFilterFields = ['List', 'ReferenceMany'];
function convertToFilterInputs(fieldDataArr) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.filter(item => noFilterFields.indexOf(item.type) === -1).map(convertToFilterInput);
}

function convertToFilterInput(fieldData) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (!rest.label) {
    rest.label = capitalize(rest.name);
  }
  if (rest.display) {
    rest.display = convertToInput(rest.display);
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].i, ...rest };
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
