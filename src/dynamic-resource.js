import { EField, EType } from './meta/consts';
import { required } from 'react-admin';

function capitalize(str) {
  if (!str) {
    return;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function entityToModel(entity) {
  if (entity.editable === false) {
    const fields = entity.fields
      .filter(f => f.hidden !== true)
      .map(f => {
        f.readOnly = true;
        return f;
      });

    return {
      readOnly: true,
      name: entity.resourceName,
      icon: entity.icon,
      list: {
        bulkActions: null,
        title: entity.title,
        actions: entity.actions || [],
        fields: convertToFields(fields, entity.resourceName)
          .concat([{ type: EField.ShowButton, label: "View" }])
      },
      show: {
        title: "View " + entity.title,
        fields: convertToFields(fields, entity.resourceName)
      },
      filters: {
        fields: convertToFilterInputs(fields, entity.resourceName)
      }
    };
  }
  const fields = entity.fields.filter(f => f.hidden !== true);
  return {
    name: entity.resourceName,
    icon: entity.icon,
    list: {
      title: entity.title,
      fields: convertToFields(fields, entity.resourceName).concat([{ type: EField.EditButton }]),
      actions: entity.actions || []
    },
    edit: {
      title: "Edit " + entity.title,
      inputs: convertToInputs(entity.fields, entity.resourceName)
    },
    create: {
      title: "Create New " + entity.title,
      inputs: convertToInputs(entity.fields, entity.resourceName)
    },
    filters: {
      fields: convertToFilterInputs(fields, entity.resourceName)
    }
  }
}

function convertToFields(fieldDataArr, entityName) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.map(i => convertToField(i, entityName));
}

function convertToField(fieldData, entityName) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (!rest.label) {
    rest.label = capitalize(rest.name);
  }
  if (rest.display) {
    rest.display = convertToField(rest.display, entityName + "_" + fieldData.name);
  }
  if (rest.fields) {
    rest.fields = rest.fields.map(i => convertToField(i, entityName + "_" + fieldData.name));
  }
  if (rest.choices) {
    rest.choices = rest.choices.map(choice => {
      if (choice.hasOwnProperty('id') && choice.hasOwnProperty('name')) {
        return choice;
      }
      return { id: choice, name: choice };
    });
  }
  if (!rest.readOnly && rest.required === true) {
    rest.validate = [required()];
  }
  if (!rest.className && entityName !== undefined) {
    //rest.className = entityName + '_' + fieldData.name;
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].field, ...rest };
}

function convertToInputs(fieldDataArr, entityName) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.filter(item => !item.readOnly).map(i => convertToInput(i, entityName));
}

function convertToInput(fieldData, entityName) {
  if (fieldData.type.toLowerCase() === "referencemany") {
    return convertToField(fieldData, entityName);
  }
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  if (!rest.label) {
    rest.label = capitalize(rest.name);
  }
  if (rest.display) {
    rest.display = convertToInput(rest.display, entityName + "_" + fieldData.name);
  }
  if (rest.fields) {
    rest.fields = rest.fields.map(i => convertToInput(i, entityName + "_" + fieldData.name));
  }
  if (rest.choices) {
    rest.choices = rest.choices.map(choice => {
      if (choice.hasOwnProperty('id') && choice.hasOwnProperty('name')) {
        return choice;
      }
      return { id: choice, name: choice };
    });
  }

  if (!rest.readOnly && rest.required === true) {
    rest.validate = [required()];
  }
  if (!rest.className && entityName !== undefined) {
    //rest.className = entityName + '_' + fieldData.name;
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].input, ...rest };
}

function convertToFilterInputs(fieldDataArr) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr.filter(item => EType[item.type.toLowerCase()].filter !== null).map(convertToFilterInput);
}

function convertToFilterInput(fieldData) {
  const rest = Object.assign({}, fieldData);
  delete rest.name;
  delete rest.type;
  delete rest.readOnly;

  if (!rest.label) {
    rest.label = capitalize(rest.name);
  }
  if (rest.display) {
    rest.display = convertToInput(rest.display);
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].filter, ...rest };
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
    console.log('resources ', resources);
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
