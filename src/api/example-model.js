const DyplomaModel = {
  authentication: {
    url: "http://dyploma.outbrain.com:8080/DyPloMa/auth"
  },
  actions: [
    {
      id: "restart",
      title: "Restart",
      resource: 'service',
      icon: "BatteryCharging80",
      confirm: "Are you should you want to restart {{ids.length}} services?",
      endpoint: {
        url: "http://localhost:3000/service/show/ids={{ids}}",
        method: 'POST',
        headers: {
          CUSTOM: 'HELLO'
        }
      },
      inputs: [
        {
          name: "comment",
          label: "Comment",
          required: true,
          type: "string"
        }
      ]
    }
  ],
  data: [
    {
      title: "Service",
      resourceName: "service",
      icon: "BatteryCharging60",
      endpoint: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/services",
      customEndpoints: {
        baseUrl: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1",
        list: { url: "/services/find/limit/{{limit}}/offset/{{offset}}" },
        get: { url: "/services/{{id}}", method: "GET" },
        create: { url: "/services/", method: "POST" },
        update: { url: "/services/", method: "PUT" },
        getBy: {
          name: { url: "/services/name/like/{{name}}" },
          owner: { url: "/services/owner/{{owner}}" }
        }
      },
      operations: ['edit', 'create', 'list'],
      fields: [
        {
          name: "id",
          type: "Number",
          readOnly: true
        },
        {
          tab: "Main",
          name: "name",
          type: "String",
          required: true
        },
        {
          tab: "Main",
          name: "owner",
          type: "String",
          required: true
        },
        {
          tab: "Main",
          name: "serviceType",
          type: "Select",
          required: true,
          choices: ["ob1k", "sage", "zemanta"],
          rangeStyles: [
            {
              style: { color: 'pink' },
              values: ['sage', 'zem.*']
            },
          ]
        },
        {
          tab: "Advanced",
          name: "external",
          type: "Boolean",
          defaultValue: false,
          rangeStyles: [
            {
              style: { color: 'LawnGreen' },
              value: true
            }
          ]
        },
        {
          tab: "Advanced",
          name: "antiAffinity",
          type: "Boolean",
          defaultValue: false
        },
        {
          tab: "Advanced",
          name: "externalPort",
          label: "External Port",
          type: "Number",
          defaultValue: 0
        },
        {
          tab: "Advanced",
          name: "creationTimestamp",
          type: "Date",
          readOnly: true
        },
        {
          name: "restart",
          type: "action",
          action: "restart"
        },
        {
          tab: "Advanced",
          name: "deployments",
          label: "Deployments",
          type: "ReferenceMany",
          reference: "deployment",
          readOnly: true,
          target: "serviceId",
          display: {
            name: "name",
            type: "Chip"
          }
        }
      ]
    },
    {
      title: "Deployment",
      resourceName: "deployment",
      icon: "BatteryCharging20",
      endpoint: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments",
      customEndpoints: {
        list: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/find/limit/{{limit}}/offset/{{offset}}" },
        get: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/{{id}}", method: "GET" },
        create: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/", method: "POST" },
        update: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/", method: "PUT" },
        getBy: {
          serviceId: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/service/{{id}}" }
        }
      },
      editable: false,
      fields: [
        {
          name: "id",
          type: "Number",
          readOnly: true,
          options: { useGrouping: false }
        },
        {
          name: "name",
          type: "String",
          required: true
        },
        {
          label: "Environment",
          name: "environmentId",
          type: "enum",
          choices: [
            { id: 1, name: 'all' },
            { id: 2, name: 'junit' },
            { id: 3, name: 'prod' },
            { id: 5, name: 'test' },
            { id: 6, name: 'sim' },
            { id: 8, name: 'simulator' },
            { id: 9, name: 'dev' },
            { id: 10, name: 'rnd' }
          ]
        },
        {
          label: "Cluster",
          name: "kubeClusterId",
          type: "enum",
          choices: [
            { id: 2, name: 'nydc1' },
            { id: 3, name: 'sadc1c' },
            { id: 4, name: 'chidc2c' },
            { id: 5, name: 'stg' },
            { id: 11, name: 'simulator' },
            { id: 12, name: 'test' },
            { id: 13, name: 'dev' },
            { id: 14, name: 'rnd' }
          ]
        },
        {
          name: "artifactId",
          type: "Reference",
          reference: "artifact",
          display: {
            name: "version",
            render: (record) => {
              return record.version + " - " + record.commitMessage
            },
            type: "String"
          }
        },
        {
          name: "extraTag",
          type: "String"
        },
        {
          name: "external",
          type: "Boolean",
          defaultValue: false
        },
        {
          name: "creationTimestamp",
          type: "Date",
          readOnly: true
        },
        {
          label: "Tags",
          name: "serviceTags",
          type: "String",
          hidden: true
        },
        {
          name: "serviceId",
          type: "Reference",
          reference: "service",
          display: {
            name: "name",
            type: "Select"
          }
        }
      ]
    },
    {
      title: "Artifact",
      resourceName: "artifact",
      endpoint: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/artifacts",
      customEndpoints: {
        list: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/artifacts/find/limit/{{limit}}/offset/{{offset}}" },
        get: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/artifacts/{{id}}", method: "GET" },
        getBy: {
          serviceId: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/artifacts/service/{{id}}" }
        }
      },

      editable: false,
      fields: [
        {
          name: "id",
          type: "Number",
          options: { useGrouping: false }
        },
        {
          name: "version",
          type: "String"
        },
        {
          name: "buildNumber",
          type: "String",
          hidden: true
        },
        {
          name: "kind",
          type: "String"
        },
        {
          name: "commitMessage",
          type: "Text"
        },
        {
          name: "creationTimestamp",
          type: "Date"
        },
        {
          name: "uri",
          type: "Url"
        },
        {
          name: "serviceId",
          type: "Reference",
          reference: "service",
          display: {
            name: "name",
            type: "String"
          }
        }
      ]
    }
  ]
};


const BandsModel = {
  data: [
    {
      title: "Band",
      resourceName: "band",
      endpoint: "/band",
      fields: [
        {
          name: "id",
          type: "Number",
          readOnly: true
        },
        {
          name: "name",
          type: "String",
          required: true
        },
        {
          name: "bio",
          label: "Biography",
          type: "Text",
          placeholder: "Enter band biography here"
        },
        {
          name: "Icon",
          type: "icon"
        },
        {
          name: "Level",
          type: "enum",
          choices: [
            { id: 1, name: "Level 1", icon: "LooksOne" },
            { id: 2, name: "Level 2", icon: "LooksTwo" },
            { id: 3, icon: "Looks3" }

          ]
        },
        {
          name: "active",
          type: "Boolean",
          defaultValue: true
        },
        {
          name: "members",
          type: "List",
          fields: [
            {
              name: "name",
              type: "String",
              required: true
            },
            {
              name: "part",
              type: "Select",
              required: true,
              choices: ["Vocals", "Drums", "Bass", "Guitar", "Keyboard", "Violin"]
            }
          ]
        },
        {
          label: "Albums",
          type: "ReferenceMany",
          reference: "album",
          target: "band",
          display: {
            name: "name",
            type: "Chip"
          }
        }
      ]
    },
    {
      title: "Album",
      resourceName: "album",
      endpoint: "/album",
      fields: [
        {
          name: "id",
          type: "Number",
          readOnly: true
        },
        {
          name: "name",
          type: "String",
          required: true
        },
        {
          name: "band",
          type: "Reference",
          reference: "band",
          display: {
            name: "name",
            type: "Select",
            optionText: "name"
          }
        },
        {
          name: "publishDate",
          label: "Publish Date",
          type: "Date"
        }
      ]
    }
  ]
};

const BumperModel = {
  "total": 4,
  "data": [{
    "id": 0,
    "resourceName": "pom",
    "title": "Pom",
    "endpoint": "http://dev.bumper.service.nydc1.consul:8080/Bumper/crud",
    "fields": [{
      "name": "id",
      "label": "Id",
      "type": "NUMBER",
      "required": true,
      "readOnly": true,
      "hidden": false,
      "options": { "useGrouping": false }
    }, {
      "name": "name",
      "label": "Name",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "type",
      "label": "Type",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "path",
      "label": "Path",
      "type": "URL",
      "required": false,
      "readOnly": false,
      "hidden": false,
      "className": "projectPath"
    }, {
      "name": "owner",
      "label": "Owner",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "slug_key",
      "label": "Slug_key",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": true
    }, {
      "name": "project_key",
      "label": "Project_key",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": true
    }, {
      "name": "timestamp",
      "label": "Timestamp",
      "type": "DATE",
      "required": true,
      "readOnly": false,
      "hidden": true
    }, {
      "name": "dependencys",
      "label": "Dependencies",
      "type": "REFERENCEMANY",
      "required": false,
      "readOnly": false,
      "reference": "dependency",
      "target": "pom",
      "display": { "name": "name", "type": "Chip", "optionText": "name" },
      "hidden": false
    }],
    "editable": false
  }, {
    "id": 1,
    "resourceName": "property",
    "title": "Property",
    "endpoint": "http://dev.bumper.service.nydc1.consul:8080/Bumper/crud",
    "fields": [{
      "name": "id",
      "label": "Id",
      "type": "NUMBER",
      "required": true,
      "readOnly": true,
      "hidden": false,
      "options": { "useGrouping": false }
    }, {
      "name": "name",
      "label": "Name",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "groupId",
      "label": "GroupId",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "owner",
      "label": "Owner",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": true
    }, {
      "name": "timestamp",
      "label": "Timestamp",
      "type": "DATE",
      "required": true,
      "readOnly": false,
      "hidden": true
    }, {
      "name": "dependencys",
      "label": "Dependencies",
      "type": "REFERENCEMANY",
      "required": false,
      "readOnly": false,
      "reference": "dependency",
      "target": "property",
      "display": { "name": "name", "type": "Chip", "optionText": "name" },
      "hidden": false
    }],
    "editable": false
  }, {
    "id": 2,
    "resourceName": "dependency",
    "title": "Dependency",
    "endpoint": "http://dev.bumper.service.nydc1.consul:8080/Bumper/crud",
    "fields": [{
      "name": "id",
      "label": "Id",
      "type": "NUMBER",
      "required": true,
      "readOnly": true,
      "hidden": false,
      "options": { "useGrouping": false }
    }, {
      "name": "name",
      "label": "Name",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "version",
      "label": "Version",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "property",
      "label": "Property",
      "type": "REFERENCE",
      "required": true,
      "readOnly": false,
      "reference": "property",
      "display": { "name": "name", "type": "Select", "optionText": "name" },
      "hidden": false
    }, {
      "name": "pom",
      "label": "Pom",
      "type": "REFERENCE",
      "required": true,
      "readOnly": false,
      "reference": "pom",
      "display": { "name": "name", "type": "Select", "optionText": "name" },
      "hidden": false
    }, {
      "name": "timestamp",
      "label": "Timestamp",
      "type": "DATE",
      "required": true,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "bumps",
      "label": "Bumps",
      "type": "REFERENCEMANY",
      "required": false,
      "readOnly": false,
      "reference": "bump",
      "target": "dependency",
      "display": { "name": "id", "type": "Chip", "optionText": "id" },
      "hidden": false
    }, {
      "name": "requests",
      "label": "Requests",
      "type": "REFERENCEMANY",
      "required": false,
      "readOnly": false,
      "reference": "request",
      "target": "dependency",
      "display": { "name": "name", "type": "Chip", "optionText": "name" },
      "hidden": true
    }],
    "editable": false
  }, {
    "id": 3,
    "resourceName": "bump",
    "title": "Bump",
    "endpoint": "http://dev.bumper.service.nydc1.consul:8080/Bumper/crud",
    "fields": [{
      "name": "id",
      "label": "Id",
      "type": "NUMBER",
      "required": true,
      "readOnly": true,
      "hidden": false,
      "options": { "useGrouping": false }
    }, {
      "name": "property_name",
      "label": "Property Name",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "version",
      "label": "Version",
      "type": "STRING",
      "required": false,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "dependency",
      "label": "Dependency",
      "type": "REFERENCE",
      "required": true,
      "readOnly": false,
      "reference": "dependency",
      "display": { "name": "name", "type": "Select", "optionText": "name" },
      "hidden": false
    }, {
      "name": "timestamp",
      "label": "Timestamp",
      "type": "DATE",
      "required": true,
      "readOnly": false,
      "hidden": false
    }, {
      "name": "requests",
      "label": "Pull Requests",
      "type": "LIST",
      "required": false,
      "readOnly": false,
      "reference": "request",
      "target": "bump",
      "display": { "name": "name", "type": "Chip", "optionText": "name" },
      "hidden": false,
      "fields": [{
        "name": "id",
        "label": "Id",
        "type": "NUMBER",
        "required": true,
        "readOnly": true,
        "hidden": false,
        "options": { "useGrouping": false }
      }, {
        "name": "name",
        "label": "Name",
        "type": "STRING",
        "required": false,
        "readOnly": false,
        "hidden": false
      }, {
        "name": "status",
        "label": "Status",
        "type": "STRING",
        "required": false,
        "readOnly": false,
        "hidden": false
      }, {
        "name": "pull_request_url",
        "label": "Pull Request Url",
        "type": "URL",
        "required": false,
        "readOnly": false,
        "hidden": false,
        "className": "projectPath"
      }, {
        "name": "dependency",
        "label": "Dependency",
        "type": "REFERENCE",
        "required": true,
        "readOnly": false,
        "reference": "dependency",
        "display": { "name": "name", "type": "Select", "optionText": "name" },
        "hidden": false
      }, {
        "name": "timestamp",
        "label": "Timestamp",
        "type": "DATE",
        "required": true,
        "readOnly": false,
        "hidden": false
      }, {
        "name": "pull_request_id",
        "label": "Pull_request_id",
        "type": "NUMBER",
        "required": false,
        "readOnly": false,
        "hidden": true
      }]
    }],
    "editable": false
  }],
  "actions": [{
    "resource": "dependency",
    "actionName": "Bump",
    "title": "Bump",
    "icon": "BatteryCharging80",
    "endpoint": { "url": "http://dev.bumper.service.nydc1.consul:8080/Bumper/crud/dependency/action/Bump?ids={{ids}}", "method": "Post" },
    "inputs": [{ "name": "versionToApprove", "label": "VersionToApprove", "type": "TEXT", "required": true }],
    "editable": true
  }, {
    "resource": "property",
    "actionName": "Bump",
    "title": "Bump",
    "icon": "BatteryCharging80",
    "endpoint": { "url": "http://dev.bumper.service.nydc1.consul:8080/Bumper/crud/property/action/Bump?ids={{ids}}", "method": "Post" },
    "inputs": [{ "name": "versionToApprove", "label": "VersionToApprove", "type": "TEXT", "required": true }],
    "editable": true
  }],
  "authentication": { "url": "http://dev.bumper.service.nydc1.consul:8080/Bumper/auth" }
};

const TODOs = {
  data: [
    {
      title: "ToDos",
      resourceName: "todos",
      endpoint: "https://jsonplaceholder.typicode.com",
      fields: [
        {
          name: "id",
          type: "number",
          readOnly: true
        },
        {
          name: "title",
          type: "string",
          required: true,
        },
        {
          name: "completed",
          type: "boolean",
          required: true
        },
        {
          name: "icon",
          type: "icon"
        }
      ]
    }
  ]
};

const lowercaseWithNoSpace = () =>
  (value) => {
    const onlyLetters = /^[a-z]+$/.test(value);
    return onlyLetters ? undefined : 'Lowercase letters only';
  };


const MetaModel = {
  data: [
    {
      title: "Models",
      resourceName: "model",
      endpoint: "localstorage",
      fields: [
        {
          name: "Entities",
          type: "list",
          validate: [lowercaseWithNoSpace()],
          fields: [
            {
              name: "title",
              type: "string",
              placeholder: "Display name of the entity",
              required: true
            },
            {
              name: "resourceName",
              type: "string",
              placeholder: "Entity name (used to refer to this entity)",
              validate: [lowercaseWithNoSpace()],
              required: true
            },
            {
              name: "fields",
              type: "list",
              fields: [
                {
                  name: "name",
                  type: "string"
                },
                {
                  name: "type",
                  type: "select",
                  choices: ["string", "number", "boolean", "text", "date", "select"]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const RulesModel = {
  actions: [
    {
      id: "checkRule",
      title: "Check now",
      resource: 'rule',
      icon: "BatteryCharging80",
      confirm: "Select source and widget for checking {{ids.length}} rule(s)",
      endpoint: {
        url: "http://localhost:3000/check/rules/ids={{ids}}",
        method: 'POST'
      },
      inputs: [
        {
          name: "sourceId",
          label: "Source Id",
          required: true,
          type: "number"
        },
        {
          name: "widgetId",
          label: "Widget Id",
          required: true,
          type: "number"
        }
      ]
    },
    {
      id: "checkGroup",
      title: "Check now",
      resource: 'group',
      icon: "BatteryCharging80",
      confirm: "Select source and widget for checking {{ids.length}} rule(s)",
      endpoint: {
        url: "http://localhost:3000/check/group/ids={{ids}}",
        method: 'POST'
      },
      inputs: [
        {
          name: "sourceId",
          label: "Source Id",
          required: true,
          type: "number"
        },
        {
          name: "widgetId",
          label: "Widget Id",
          required: true,
          type: "number"
        }
      ]
    }

  ],
  data: [
    {
      title: "Rules Group",
      resourceName: "group",
      endpoint: "localstorage",
      fields: [
        {
          name: "id",
          type: "number",
          readOnly: true
        },
        {
          name: "name",
          type: "string",
          required: true,
        },
        {
          name: "rules",
          label: "Rules",
          type: "ReferenceMany",
          reference: "rule",
          target: "list",
          display: {
            name: "name",
            type: "Chip"
          }
        },
        {
          name: "check",
          label: "check now",
          type: "action",
          action: "checkGroup"
        }
      ]
    },
    {
      title: "Rule",
      resourceName: "rule",
      endpoint: "localstorage",
      fields: [
        {
          name: "id",
          type: "number",
          readOnly: true
        },
        {
          name: "parentId",
          type: "number"
        },
        {
          name: "name",
          type: "string",
          required: true,
        },
        {
          name: "list",
          type: "Reference",
          reference: "group",
          display: {
            name: "name",
            type: "Select",
            optionText: "name"
          }
        },
        {
          tab: "Validations",
          label: "Combine Operator",
          name: "combine",
          type: "select",
          choices: ["And", "Or"],
          defaultValue: "And"
        },
        {
          tab: "Validations",
          name: "validations",
          type: "List",
          fields: [
            {
              name: "settingId",
              title: "Setting Id",
              type: "number",
              required: true
            },
            {
              name: "operator",
              type: "select",
              choices: ["=", ">=", "<=", ">", "<", "is null", "contains", "starts with", "ends with"],
              required: true
            },
            {
              name: "value",
              type: "string"
            }
          ]
        },
        {
          tab: "Actions",
          label: "Action if true",
          name: "trueAction",
          type: "select",
          choices: ["Alert", "Stop", "Run next rule"]
        },
        {
          tab: "Actions",
          label: "Action If false",
          name: "falseAction",
          type: "select",
          choices: ["Alert", "Stop", "Move to next rule"]
        },
        {
          label: "Check Now",
          name: "check",
          type: "action",
          action: "checkRule"
        },

      ]
    },
  ]
};

export { BandsModel, DyplomaModel, BumperModel, TODOs, MetaModel, RulesModel }

