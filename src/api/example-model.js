const DyplomaModel = {
  authentication : {
    url: "http://dyploma.outbrain.com:8080/DyPloMa/auth"
  },
  data: [
    {
      title: "Service",
      resourceName: "service",
      endpoint: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/services",
      customEndpoints: {
        baseUrl : "http://dyploma.outbrain.com:8080/DyPloMa/api/v1",
        list: { url: "/services/find/limit/{{limit}}/offset/{{offset}}" },
        get: { url: "/services/{{id}}", method: "GET" },
        create: { url: "/services/", method: "POST" },
        update: { url: "/services/", method: "PUT" },
        getBy: {
          name: { url: "/services/name/like/{{name}}" },
          owner: { url: "/services/owner/{{owner}}" }
        }
      },
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
          name: "owner",
          type: "String",
          required: true
        },
        {
          name: "serviceType",
          type: "Select",
          required: true,
          choices: ["ob1k", "sage", "zemanta"]
        },
        {
          name: "external",
          type: "Boolean",
          defaultValue: false
        },
        {
          name: "antiAffinity",
          type: "Boolean",
          defaultValue: false
        },
        {
          name: "externalPort",
          label: "External Port",
          type: "Number",
          defaultValue: 0
        },
        {
          name: "creationTimestamp",
          type: "Date",
          readOnly: true
        },
        {
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
    }
  ]
};


const BandsModel = {
  data: [
    {
      "title": "Band",
      "resourceName": "band",
      "endpoint": "/band",
      "fields": [
        {
          "name": "id",
          "type": "Number",
          "readOnly": true
        },
        {
          "name": "name",
          "type": "String",
          "required": true
        },
        {
          "name": "bio",
          "label": "Biography",
          "type": "Text",
          "placeholder": "Enter band biography here"
        },
        {
          "name": "active",
          "type": "Boolean",
          "defaultValue": true
        },
        {
          "name": "members",
          "type": "List",
          "fields": [
            {
              "name": "name",
              "type": "String",
              "required": true
            },
            {
              "name": "part",
              "type": "Select",
              "required": true,
              "choices": ["Vocals", "Drums", "Bass", "Guitar", "Keyboard", "Violin"]
            }
          ]
        },
        {
          "label": "Albums",
          "type": "ReferenceMany",
          "reference": "album",
          "target": "band",
          "display": {
            "name": "name",
            "type": "Chip"
          }
        }
      ]
    },
    {
      "title": "Album",
      "resourceName": "album",
      "endpoint": "/album",
      "fields": [
        {
          "name": "id",
          "type": "Number",
          "readOnly": true
        },
        {
          "name": "name",
          "type": "String",
          "required": true
        },
        {
          "name": "band",
          "type": "Reference",
          "reference": "band",
          "display": {
            "name": "name",
            "type": "Select",
            "optionText": "name"
          }
        },
        {
          "name": "publishDate",
          "label": "Publish Date",
          "type": "Date"
        }
      ]
    }
  ]
};

const BumperModel = {
  total: 3,
  data:
    [
      {
        id: 0,
        resourceName: "project",
        title: "Project",
        endpoint: "../projects",
        fields:
          [
            {
              name: "id",
              label: "Id",
              type: "STRING",
              required: true,
              readOnly: true
            },
            {
              name: "path",
              label: "Path",
              type: "STRING",
              required: false,
              readOnly: false
            },
            {
              name: "modules",
              label: "Modules",
              type: "NUMBER",
              required: false,
              readOnly: false
            },
            {
              name: "production",
              label: "Production (%)",
              type: "NUMBER",
              required: false,
              readOnly: false
            },
            {
              name: "owner",
              label: "Owner",
              type: "STRING",
              required: false,
              readOnly: false
            },
            {
              name: "dependencys",
              label: "Dependencies",
              type: "REFERENCEMANY",
              required: false,
              readOnly: false,
              reference: "dependency",
              target: "project",
              display:
                {
                  name: "idproject",
                  type: "Chip"
                }
            }
          ]
      },
      {
        id: 1,
        resourceName: "artifact",
        title: "Artifact",
        endpoint: "../artifacts",
        fields:
          [
            {
              name: "id",
              label: "Id",
              type: "STRING",
              required: true,
              readOnly: true
            },
            {
              name: "owner",
              label: "Owner",
              type: "STRING",
              required: false,
              readOnly: false
            },
            {
              name: "groupId",
              label: "GroupId",
              type: "STRING",
              required: false,
              readOnly: false
            },
            {
              name: "dependencys",
              label: "Usages",
              type: "REFERENCEMANY",
              required: false,
              readOnly: false,
              reference: "dependency",
              target: "artifact",
              display:
                {
                  name: "idartifact",
                  type: "Chip"
                }
            }
          ]
      },
      {
        id: 2,
        resourceName: "dependency",
        title: "Dependency",
        endpoint: "../dependencys",
        fields:
          [
            {
              name: "id",
              label: "Id",
              type: "STRING",
              required: true,
              readOnly: true
            },
            {
              name: "project",
              label: "Project",
              type: "REFERENCE",
              required: true,
              readOnly: false,
              reference: "project",
              display:
                {
                  name: "id",
                  type: "Select",
                  optionText: "id"
                }
            },
            {
              name: "artifact",
              label: "Artifact",
              type: "REFERENCE",
              required: true,
              readOnly: false,
              reference: "artifact",
              display:
                {
                  name: "id",
                  type: "Select",
                  optionText: "id"
                }
            },
            {
              name: "idproject",
              label: "Idproject",
              type: "STRING",
              required: false,
              readOnly: false
            },
            {
              name: "idartifact",
              label: "Idartifact",
              type: "STRING",
              required: false,
              readOnly: false
            },
            {
              name: "version",
              label: "Version",
              type: "STRING",
              required: false,
              readOnly: false
            }
          ]
      }
    ]
};

export { BandsModel, DyplomaModel, BumperModel }

