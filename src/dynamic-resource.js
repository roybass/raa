import { EField, EType, EVisibility } from './meta/consts';
import { required } from 'react-admin';

function capitalize(str) {
  if (!str) {
    return;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertChoices(choices) {
  return choices.map(choice => {
    if (choice.hasOwnProperty('id')) {
      return choice;
    }
    return { id: choice, name: choice };
  });
}

function entityToModel(entity) {

  if (entity.actions) {
    entity.actions.forEach(action => {
        if (!action.inputs) {
          action.inputs = [];
          return;
        }
        action.inputs = action.inputs.map(input => convertToInput(input, entity.resourceName));
      }
    )
  }

  const operations = new Set(entity.operations || ['edit', 'create', 'list']);

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
      listType: entity.listType || 'list',
      list: !operations.has('list') ? null : {
        readOnly: true,
        title: entity.title,
        actions: entity.actions || [],
        fields: convertToFields(fields, entity.resourceName, EVisibility.list)
          .concat([{ type: EField.ShowButton, label: "View" }])
      },
      show: {
        title: "View " + entity.title,
        fields: convertToFields(fields, entity.resourceName, EVisibility.show)
      },
      filters: {
        fields: convertToFilterInputs(fields, entity.resourceName)
      }
    };
  }
  const fields = entity.fields.filter(f => f.hidden !== true);

  let convertedFields = convertToFields(fields, entity.resourceName, EVisibility.list);

  if (operations.has('edit')) {
    convertedFields = convertedFields.concat([{ type: EField.EditButton }]);
  }

  return {
    name: entity.resourceName,
    icon: entity.icon,
    listType: entity.listType || 'list',
    list: !operations.has('list') ? null : {
      readOnly: false,
      title: entity.title,
      fields: convertedFields,
      actions: entity.actions || []
    },
    filters: {
      fields: convertToFilterInputs(fields, entity.resourceName, EVisibility.filter)
    },
    edit: !operations.has('edit') ? null : {
      title: "Edit " + entity.title,
      inputs: convertToInputs(entity.fields, entity.resourceName, EVisibility.edit)
    },
    create: !operations.has('create') ? null : {
      title: "Create New " + entity.title,
      inputs: convertToInputs(entity.fields, entity.resourceName, EVisibility.create)
    },
    show: {
      title: "View " + entity.title,
      fields: convertToFields(fields, entity.resourceName, EVisibility.show)
    }
  }
}

function convertToFields(fieldDataArr, entityName, visibility) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr
    .filter(item => !item.visibility || item.visibility.indexOf(visibility) !== -1)
    .map(i => convertToField(i, entityName));
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
    rest.choices = convertChoices(rest.choices);
  }
  if (!rest.readOnly && rest.required === true) {
    rest.validate = [required()];
  }
  if (!rest.className && entityName !== undefined) {
    //rest.className = entityName + '_' + fieldData.name;
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].field, ...rest };
}

function convertToInputs(fieldDataArr, entityName, visibility) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr
    .filter(item => EType[item.type.toLowerCase()].input !== null)
    .filter(item => visibility === EVisibility.edit || !item.readOnly)
    .filter(item => !item.visibility || item.visibility.indexOf(visibility) !== -1)
    .map(i => convertToInput(i, entityName));
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
    rest.choices = convertChoices(rest.choices);
  }

  if (!rest.readOnly && rest.required === true) {
    rest.validate = [required()];
  }
  if (!rest.className && entityName !== undefined) {
    //rest.className = entityName + '_' + fieldData.name;
  }
  return { source: fieldData.name, type: EType[fieldData.type.toLowerCase()].input, ...rest };
}

function convertToFilterInputs(fieldDataArr, visibility) {
  if (!fieldDataArr) {
    return [];
  }
  return fieldDataArr
    .filter(item => EType[item.type.toLowerCase()].filter !== null)
    .filter(item => !item.visibility || item.visibility.indexOf(visibility) !== -1)
    .map(convertToFilterInput);
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
  if (rest.choices) {
    rest.choices = convertChoices(rest.choices);
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

    // Place the actions inside entities, for simpler processing
    if (model.actions) {
      model.actions.forEach(action => {
        const entityName = action.resource;
        const entity = model.data.find(e => e.resourceName === entityName);
        if (!entity.actions) {
          entity.actions = [];
        }
        entity.actions.push(action);
        entity.fields.forEach(field => {
          if (field.type === "action" && field.action === action.id) {
            field.action = action;
            field.visibility = field.visibility || ['list'];
          }
        })
      })
    }
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
    if (!Array.isArray(obj)) {
      obj.key = this.key++;
    }
    const keys = Object.keys(obj);
    for (let key of keys) {
      this.assignKeys(obj[key]);
    }
  }
}

export default new DynamicResources();
