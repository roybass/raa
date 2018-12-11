const DyplomaModel = {
  authentication: {
    url: "http://dyploma.outbrain.com:8080/DyPloMa/auth"
  },
  actions: [
    {
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
  "total": 3,
  "data": [
    {
      "id": 0,
      "resourceName": "project",
      "title": "Project",
      "endpoint": "../projects",
      "fields": [
        {
          "name": "id",
          "label": "Id",
          "type": "STRING",
          "required": true,
          "readOnly": true,
          "hidden": false
        },
        {
          "name": "modules",
          "label": "Modules",
          "type": "NUMBER",
          "required": false,
          "readOnly": false,
          "hidden": false
        },
        {
          "name": "owner",
          "label": "Owner",
          "type": "STRING",
          "required": false,
          "readOnly": false,
          "hidden": false
        },
        {
          "name": "path",
          "label": "Path",
          "type": "URL",
          "required": false,
          "readOnly": false,
          "hidden": false
        },
        {
          "name": "production",
          "label": "Production",
          "type": "NUMBER",
          "required": false,
          "readOnly": false,
          "hidden": false,
          "options": {
            "style": "percent"
          }
        },
        {
          "name": "dependencys",
          "label": "Dependencies",
          "type": "REFERENCEMANY",
          "required": false,
          "readOnly": false,
          "reference": "dependency",
          "target": "project",
          "display": {
            "name": "idproject",
            "type": "Chip",
            "optionText": "id"
          },
          "hidden": false
        }
      ],
      "editable": false,
      "icon": "Explore"
    },
    {
      "id": 1,
      "resourceName": "artifact",
      "title": "Artifact",
      "endpoint": "../artifacts",
      "fields": [
        {
          "name": "id",
          "label": "Id",
          "type": "STRING",
          "required": true,
          "readOnly": true,
          "hidden": false
        },
        {
          "name": "groupId",
          "label": "GroupId",
          "type": "STRING",
          "required": false,
          "readOnly": false,
          "hidden": false
        },
        {
          "name": "owner",
          "label": "Owner",
          "type": "STRING",
          "required": false,
          "readOnly": false,
          "hidden": false
        },
        {
          "name": "dependencys",
          "label": "Usages",
          "type": "REFERENCEMANY",
          "required": false,
          "readOnly": false,
          "reference": "dependency",
          "target": "artifact",
          "display": {
            "name": "idartifact",
            "type": "Chip",
            "optionText": "id"
          },
          "hidden": false
        }
      ],
      "editable": false,
      "icon": "Stars"
    },
    {
      "id": 2,
      "resourceName": "dependency",
      "title": "Dependency",
      "endpoint": "../dependencys",
      "fields": [
        {
          "name": "id",
          "label": "Id",
          "type": "STRING",
          "required": true,
          "readOnly": true,
          "hidden": false
        },
        {
          "name": "artifact",
          "label": "Artifact",
          "type": "REFERENCE",
          "required": true,
          "readOnly": false,
          "reference": "artifact",
          "display": {
            "name": "id",
            "type": "Select",
            "optionText": "id"
          },
          "hidden": false
        },
        {
          "name": "idartifact",
          "label": "Idartifact",
          "type": "STRING",
          "required": false,
          "readOnly": false,
          "hidden": true
        },
        {
          "name": "idproject",
          "label": "Idproject",
          "type": "STRING",
          "required": false,
          "readOnly": false,
          "hidden": true
        },
        {
          "name": "project",
          "label": "Project",
          "type": "REFERENCE",
          "required": true,
          "readOnly": false,
          "reference": "project",
          "display": {
            "name": "id",
            "type": "Select",
            "optionText": "id"
          },
          "hidden": false
        },
        {
          "name": "version",
          "label": "Version",
          "type": "STRING",
          "required": false,
          "readOnly": false,
          "hidden": false
        }
      ],
      "editable": false,
      "icon": "SwapCalls"
    }
  ]
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
export { BandsModel, DyplomaModel, BumperModel, TODOs }

